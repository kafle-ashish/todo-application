import { atom, atomFamily } from "recoil";
import { Todo, User } from "../interfaces";

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

const defaultUserState = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    let parsedUser: Partial<User> & { token?: string } = {};

    if (user) {
        parsedUser = { ...JSON.parse(user), token };
    } else if (token) {
        parsedUser = { token };
    }

    return parsedUser;
}

export const userState = atom<Partial<User> & { token?: string }>({
    key: "UserState",
    default: defaultUserState(),
});
