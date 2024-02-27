import { config as loadEnv } from "dotenv";

loadEnv();

const configs = {
    local: {
        port: process.env.PORT ?? 3000,
        db: {
            dbHost: process.env.DB_HOST,
            dbName: process.env.DB_NAME ?? "todo_app",
            todoCollection: "todos",
            userCollection: "users"
        },
        jwtKey: process.env.JWT_KEY ?? "",
    },
    dev: {
        port: process.env.PORT ?? 3000,
        db: {
            dbHost: process.env.DB_HOST,
            dbName: process.env.DB_NAME ?? "todo_app",
            todoCollection: "todos",
            userCollection: "users"
        },
        jwtKey: process.env.JWT_KEY ?? "",
    },
} as const;

const env = (process.env.ENV ?? "local").toLowerCase() as keyof typeof configs;

export const config = configs[env]