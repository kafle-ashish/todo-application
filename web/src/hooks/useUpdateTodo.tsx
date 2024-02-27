import { message } from "antd";
import { updateTodo } from "../api/todo-api";
import { useUpdateTodoState } from "../state/state-selectors";
import { Todo } from "../interfaces";

type R = [
    (todo: Todo) => Promise<void>,
    React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
]

export function useUpdateTodo(): R {
    const [messageApi, contextHolder] = message.useMessage();
    const updateTodoState = useUpdateTodoState();

    const swicthTodoStatus = async (todo: Todo) => {
        try {
            const updatedTodo = await updateTodo(todo);

            updateTodoState(updatedTodo);
        } catch (error) {
            console.error(error);
            messageApi.error("Error adding todo!", 3);
        }
    }

    return [swicthTodoStatus, contextHolder];
}