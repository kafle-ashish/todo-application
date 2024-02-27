import { useRecoilValue } from "recoil";
import { availableTodos } from "../../../state/app-state";
import { TodoCard } from "./TodoCard";
import { Typography } from "antd";

export function TodoSection() {
    const todos = useRecoilValue(availableTodos);

    return (
        <div className="todo-items">
            {...todos.map(t => <TodoCard todoId={t} key={`todo-card-${t}`} />)}
            {todos.length === 0 && (
                <Typography.Title
                    style={{ margin: "0 auto", opacity: 0.6 }}
                >Add a new todo to get started!
                </Typography.Title>
            )}
        </div>
    );
}