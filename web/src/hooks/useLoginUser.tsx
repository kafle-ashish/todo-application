import { message } from "antd";
import { loginUser } from "../api/user-api"
import { useNavigate } from "react-router-dom";

type R = [
    (email: string, password: string) => Promise<void>,
    React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
]

export function useLoginUser(): R {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const data = await loginUser({ email, password });

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            navigate("/");

        } catch (error) {
            console.error(error);
            messageApi.error("Error logging user!", 3);
        }
    }

    return [login, contextHolder];
}