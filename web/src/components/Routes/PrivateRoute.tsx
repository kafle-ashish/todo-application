import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: React.PropsWithChildren) {
    if (!localStorage.getItem("user")) {
        Navigate({ to: "/auth" });
    }

    return children;
}