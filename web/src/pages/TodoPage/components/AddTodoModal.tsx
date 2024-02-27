import { Input, Modal } from "antd";
import { useState } from "react";
import { useAddTodo } from "../../../hooks/useAddTodo";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
}

export function AddTodoModal(props: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [addTodo, contextHolder] = useAddTodo();

    const onOk = async () => {
        if (loading) return;
        setLoading(true);
        const res = await addTodo(title, description);
        setLoading(false);

        if (res) props.setOpen(false);
    }

    return (
        <Modal
            title="Add new todo"
            onOk={onOk}
            open={props.isModalOpen}
            onCancel={() => props.setOpen(false)}
            okText="Create Todo"
            okButtonProps={{
                disabled: loading,
                loading,
            }}
            cancelButtonProps={{ disabled: loading }}
        >
            {contextHolder}
            <Input placeholder="Title"
                disabled={loading}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <Input.TextArea
                placeholder="Description"
                style={{ marginTop: "20px", minHeight: "200px" }}
                disabled={loading}
                onChange={e => setDescription(e.currentTarget.value)}
            />
        </Modal>
    );
}