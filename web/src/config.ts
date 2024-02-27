const configs = {
    local: {
        API: {
            todoApi: "http://localhost:3000"
        },
        headers: getHeaders(),
    },
    dev: {
        API: {
            todoApi: "http://localhost:3000"
        },
        headers: getHeaders(),
    },
} as const;

function getHeaders() {
    return {
        "content-type": "application/json",
        "authorization": localStorage.getItem("token"),
    };
}

const env = (import.meta.env.ENV ?? "local").toLowerCase() as keyof typeof configs;

export const config = configs[env]