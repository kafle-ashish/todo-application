import { useState } from "react";
import { Login } from "./components/Login";
import { Button, Typography } from "antd";
import { Register } from "./components/Register";

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            {isLogin ? <Login /> : <Register />}
            <Button
                onClick={() => setIsLogin(b => !b)}
                type="text"
            >
                <Typography.Text strong>
                    {isLogin ? "Not a user? Register!" : "Already a user? Login!"}
                </Typography.Text>
            </Button>
        </div>
    );
}