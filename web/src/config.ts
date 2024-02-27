const configs = {
    local: {
        API: {
            todoApi: "http://localhost:3000"
        },
        headers: getHeaders(),
    },
    dev: {
        API: {
            todoApi: "https://akcsujhdtb.execute-api.ap-southeast-2.amazonaws.com/dev"
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

const env = (import.meta.env.VITE_ENV ?? "local").toLowerCase() as keyof typeof configs;

export const config = configs[env]