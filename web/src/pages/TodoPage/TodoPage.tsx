import { Button, Pagination, PaginationProps, Select, Typography } from "antd";
import { AddIcon } from "../../components/Icons/AddIcon";
import { AddTodoModal } from "./components/AddTodoModal";
import { useEffect, useState } from "react";
import { useFetchTodos } from "../../hooks/useFetchTodos";
import { TodoSection } from "./components/TodoSection";
import { useRecoilState } from "recoil";
import { todoPaginationState } from "../../state/app-state";

export function TodoPage() {
    const [open, setOpen] = useState(false);
    const [fetchTodos, contextHolder] = useFetchTodos();
    const [paginationState, setPaginationState] = useRecoilState(todoPaginationState);

    const onPaginationChange: PaginationProps["onChange"] = (page) => {
        setPaginationState(t => ({ ...t, page }));

        fetchTodos(page, 5, paginationState.filter);
    }

    const onStatusChange = (value: "done" | "pending" | "all") => {
        setPaginationState(t => ({ ...t, filter: value, page: 1 }));

        fetchTodos(1, 5, value);
    }

    useEffect(() => {
        fetchTodos(1, 5, paginationState.filter);
    }, []);

    return (
        <div className="todo-page">
            <div className="todo-title">
                <Typography.Title>Todos</Typography.Title>
                <div className="actions">
                    <Select
                        defaultValue="pending"
                        style={{ width: 120 }}
                        onChange={onStatusChange}
                        value={paginationState.filter}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'done', label: 'Done' },
                            { value: 'all', label: 'All' },
                        ]}
                    />
                    <Button
                        icon={<AddIcon height={24} width={24} />}
                        title="Add new todo"
                        onClick={() => setOpen(t => !t)}
                    />
                </div>
            </div>
            {contextHolder}
            <TodoSection />
            <AddTodoModal isModalOpen={open} setOpen={setOpen} />
            <Pagination
                current={paginationState.page}
                total={paginationState.totalItems}
                defaultCurrent={1}
                pageSize={paginationState.take}
                defaultPageSize={5}
                onChange={onPaginationChange}
            />
        </div>
    );
}