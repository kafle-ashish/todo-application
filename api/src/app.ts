import cors from "cors";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { errorMiddleware } from './middlewares/error-middleware';
import { todoRouter } from './routes/todo-routes';
import { userRouter } from './routes/user-routes';
import * as swaggerDocument from './swagger.json';
import { connectDb } from './utils/db';
import ServerlessHttp from "serverless-http";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/todos', todoRouter);
app.use('/users', userRouter);


app.use(errorMiddleware);

connectDb();

if (process.env.ENV === "local") {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}

export const handler = ServerlessHttp(app, { provider: "aws" })