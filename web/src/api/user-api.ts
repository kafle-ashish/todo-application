import { config, getHeaders } from "../config";
import { User } from "../interfaces";

export async function registerUser(user: Omit<User, "_id">) {
    const path = "/users/register";
    const url = config.API.todoApi + path;

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        //@ts-expect-error ignore
        headers: getHeaders(),
        mode: "cors",
    });


    if (response.status !== 200) {
        throw new Error("Error registering user!");
    }

    return response.json();
}

export async function loginUser(user: Pick<User, "email" | "password">) {
    const path = "/users/login";
    const url = config.API.todoApi + path;

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        //@ts-expect-error ignore
        headers: getHeaders(),
        mode: "cors",
    });


    if (response.status !== 200) {
        throw new Error("Error logging in user!");
    }

    return response.json();
}