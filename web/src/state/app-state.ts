import { atom, atomFamily } from "recoil";
import { Todo } from "../interfaces";

export interface TodoPaginationState {
    page: number;
    take: number;
    isLoading: boolean;
    totalItems: number;
    filter: "pending" | "done" | "all";
}

export const todosState = atomFamily<Todo | null, string | null>({
    key: "TodosState",
    default: null,
});

export const todoPaginationState = atom<TodoPaginationState>({
    key: "TodoPaginationState",
    default: {
        page: 1,
        take: 5,
        isLoading: false,
        totalItems: 0,
        filter: "pending"
    },
});

export const availableTodos = atom<string[]>({
    key: "AvailableTodos",
    default: [],
});