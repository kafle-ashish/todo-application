import { config } from "../config";
import { Todo } from "../interfaces";

export async function createTodo(todo: Omit<Todo, "_id">) {
    const path = "/todos";
    const url = config.API.todoApi + path;

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: config.headers,
        mode: "cors",
    });


    if (response.status !== 201) {
        throw new Error("Error creating todo!");
    }

    return response.json();
}

export async function getUserTodos(page: number, take: number, status: "pending" | "done" | "all" = "pending") {
    const path = `/todos?page=${page}&take=${take}&status=${status}`;
    const url = config.API.todoApi + path;

    const response = await fetch(url, {
        method: "GET",
        headers: config.headers,
        mode: "cors",
    });


    if (response.status !== 200) {
        throw new Error("Error getting todos!");
    }

    return response.json();
}

export async function deleteTodo(id: string) {
    const path = `/todos/${id}`;
    const url = config.API.todoApi + path;

    const response = await fetch(url, {
        method: "DELETE",
        headers: config.headers,
        mode: "cors",
    });


    if (response.status !== 200) {
        throw new Error("Error deleting todos!");
    }
}

export async function updateTodo(todo: Pick<Todo, "_id" | "status" | "description">): Promise<Todo> {
    const { _id, ...rest } = todo;
    const path = `/todos/${_id}`;
    const url = config.API.todoApi + path;

    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(rest),
        headers: config.headers,
        mode: "cors",
    });


    if (response.status !== 200) {
        throw new Error("Error updating todo!");
    }

    return response.json();
}