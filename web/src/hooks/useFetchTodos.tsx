import { message } from "antd";
import { getUserTodos } from "../api/todo-api";
import { useRecoilState } from "recoil";
import { todoPaginationState } from "../state/app-state";
import { useAddTodoToState } from "../state/state-selectors";
import { Todo } from "../interfaces";

type R = [
    (page: number, take: number, filter: "pending" | "done" | "all") => Promise<boolean>,
    React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
]

export function useFetchTodos(): R {
    const [messageApi, contextHolder] = message.useMessage();

    const [paginationState, setPaginationState] = useRecoilState(todoPaginationState);
    const addTodoToState = useAddTodoToState();

    const fetchTodo = async (page: number, take: number, filter: "pending" | "done" | "all") => {
        try {
            if (paginationState.isLoading) return true;
            setPaginationState(s => ({ ...s, isLoading: true }));
            const [{ notes, totalCount }] = await getUserTodos(page, take, filter) as [{ notes: Todo[], totalCount: number }];

            addTodoToState(notes);

            setPaginationState(state => ({ ...state, totalItems: totalCount, isLoading: false }));

            return true;
        } catch (error) {
            console.error(error);
            messageApi.error("Error fetching todos!", 3);

            return false;
        }
    };

    return [fetchTodo, contextHolder];
}