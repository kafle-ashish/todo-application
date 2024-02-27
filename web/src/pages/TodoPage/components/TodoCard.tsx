import { Card, Input, Popconfirm, Switch } from "antd";
import { useRecoilValue } from "recoil";
import { todosState } from "../../../state/app-state";
import { DeleteIcon } from "../../../components/Icons/DeleteIcon";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";
import { useState } from "react";
import { useSwitchStatus } from "../../../hooks/useSwitchStatus";
import { SwitchChangeEventHandler } from "antd/es/switch";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { Todo } from "../../../interfaces";

interface Props {
    todoId: string;
}

export function TodoCard(props: Props) {
    const todo = useRecoilValue(todosState(props.todoId));

    const [deleteTodo, contextHolder] = useDeleteTodo();
    const [swicthStatus, switchContext] = useSwitchStatus();
    const [updateTodo, updateContext] = useUpdateTodo();

    const [isDeleting, setisDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(todo?.title);
    const [description, setDescription] = useState(todo?.description);
    const [fieldUpdating, setFieldUpdating] = useState<"title" | "description" | null>(null);

    const onConfirmDelete = async () => {
        if (isDeleting) return;
        setisDeleting(true);
        await deleteTodo(props.todoId);
        setisDeleting(false);
    }

    const onSwitchStatus: SwitchChangeEventHandler = async (checked) => {
        if (isUpdating) return;
        setIsUpdating(true);
        await swicthStatus(props.todoId, checked ? "done" : "pending");
        setIsUpdating(false);
    }

    const updateField = (field: "title" | "description") => {
        if (fieldUpdating) return;
        setFieldUpdating(field);

        const payload: Partial<Todo> = { _id: props.todoId };

        if (field === "description") payload["description"] = description;
        else payload["title"] = title;

        updateTodo(payload as Todo);
        setFieldUpdating(null);
    }

    return (
        <Card
            title={<Input
                value={title}
                variant="borderless"
                onChange={e => setTitle(e.currentTarget.value)}
                onPressEnter={() => updateField("title")}
                disabled={fieldUpdating === "title"}
            />}
            style={{ width: "300px" }}
            actions={[
                <Popconfirm
                    title="Are you sure you want to delete this todo?"
                    okText="Delete"
                    okButtonProps={{ danger: true, disabled: isDeleting, loading: isDeleting }}
                    cancelButtonProps={{ disabled: isDeleting }}
                    onConfirm={onConfirmDelete}
                >
                    <DeleteIcon height={24} width={24} />
                </Popconfirm>,
                <Switch
                    checkedChildren="Done"
                    unCheckedChildren="Pending"
                    onChange={onSwitchStatus}
                    loading={isUpdating}
                    disabled={isUpdating}
                    value={todo?.status === "done"}
                />
            ]}
        >
            {contextHolder}
            {switchContext}
            {updateContext}
            <Input.TextArea
                placeholder="Description"
                variant="borderless"
                value={description}
                onChange={e => setDescription(e.currentTarget.value)}
                onPressEnter={() => updateField("description")}
                disabled={fieldUpdating === "description"}
            />
        </Card>
    );
}