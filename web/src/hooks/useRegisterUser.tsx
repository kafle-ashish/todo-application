import { useNavigate } from "react-router";
import { registerUser } from "../api/user-api"
import { message } from "antd";

type R = [
    (email: string, password: string) => Promise<void>,
    React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
]

export function useRegisterUser(): R {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const register = async (email: string, password: string) => {
        try {
            const data = await registerUser({ email, password });

            localStorage.setItem("user", data.user);
            localStorage.setItem("token", data.token);

            setTimeout(() => navigate("/"), 1000)

        } catch (error) {
            messageApi.error("Error registering user!", 3);
        }
    }

    return [register, contextHolder];
}