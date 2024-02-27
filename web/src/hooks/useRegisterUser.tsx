import { Navigate } from "react-router-dom";
import { registerUser } from "../api/user-api"
import { message } from "antd";

type R = [
    (email: string, password: string) => Promise<void>,
    React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
]

export function useRegisterUser(): R {
    const [messageApi, contextHolder] = message.useMessage();

    const register = async (email: string, password: string) => {
        try {
            const data = await registerUser({ email, password });

            localStorage.setItem("user", data.user);
            localStorage.setItem("token", data.token);

            Navigate({ to: "/" });
        } catch (error) {
            messageApi.error("Error registering user!", 3);
        }
    }

    return [register, contextHolder];
}