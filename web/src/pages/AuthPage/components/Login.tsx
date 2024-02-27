import { Button, Input } from "antd";
import { useState } from "react";
import { useLoginUser } from "../../../hooks/useLoginUser";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setIsLoading] = useState(false);


    const [login, contextHolder] = useLoginUser();

    const handleLogin = async () => {
        if (loading) return;
        setIsLoading(true);
        await login(email, password);
        setIsLoading(false);
    };

    return (
        <div className="login-page">
            {contextHolder}
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                disabled={loading}
            />
            <Input.Password
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                disabled={loading}
            />

            <Button onClick={handleLogin} loading={loading} disabled={loading}>
                Login
            </Button>
        </div>
    );
}