import { Router } from 'express';
import { TodoController } from '../controllers/todo-controllers';
import { todoService } from '../services/todo-service';
import { createTodoValidationSchema, updateTodoValudationSchema } from '../validations/todo-validations';
import { validateRequest } from '../validations/validateRequest';
import { objectidValidationSchema } from '../validations/objectid-validation';
import { authMiddleware } from '../middlewares/auth-middleware';

export const todoRouter = Router();

todoRouter.use(authMiddleware);

const todoController = new TodoController(todoService);

const objectIdValidator = validateRequest(objectidValidationSchema, "params");

todoRouter.get(
    '/',
    todoController.getAllTodos,
);

todoRouter.get(
    '/:id',
    objectIdValidator,
    todoController.getTodoById,
);

todoRouter.post(
    '/',
    validateRequest(createTodoValidationSchema),
    todoController.createTodo
);

todoRouter.put(
    '/:id',
    objectIdValidator,
    validateRequest(updateTodoValudationSchema),
    todoController.updateTodoById,
);

todoRouter.delete(
    '/:id',
    objectIdValidator,
    todoController.deleteTodoById,
);
