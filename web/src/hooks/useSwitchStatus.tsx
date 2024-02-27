import { message } from "antd";
import { useFetchTodos } from "./useFetchTodos";
import { updateTodo } from "../api/todo-api";
import { useUpdateTodoState } from "../state/state-selectors";
import { useRecoilValue } from "recoil";
import { todoPaginationState } from "../state/app-state";

type R = [
    (_id: string, status: "done" | "pending") => Promise<void>,
    React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
]

export function useSwitchStatus(): R {
    const [messageApi, contextHolder] = message.useMessage();
    const [fetchTodos] = useFetchTodos();
    const updateTodoState = useUpdateTodoState();
    const paginationState = useRecoilValue(todoPaginationState);

    const swicthTodoStatus = async (_id: string, status: "done" | "pending") => {
        try {
            const updatedTodo = await updateTodo({ _id, status });

            await fetchTodos(paginationState.page, 5, paginationState.filter);

            updateTodoState(updatedTodo);
        } catch (error) {
            console.error(error);
            messageApi.error("Error adding todo!", 3);
        }
    }

    return [swicthTodoStatus, contextHolder];
}