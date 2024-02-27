import { Button, Input } from "antd";
import { useState } from "react";
import { useRegisterUser } from "../../../hooks/useRegisterUser";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setIsLoading] = useState(false);

    const [register, contextHolder] = useRegisterUser();

    const handleRegister = async () => {
        if (loading) return;
        setIsLoading(true);
        await register(email, password);
        setIsLoading(false);
    }

    return (
        <div className="register-page">
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

            <Button onClick={handleRegister} loading={loading} disabled={loading}>
                Register
            </Button>
        </div>
    );
}