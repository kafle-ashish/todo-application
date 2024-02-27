import { Types } from 'mongoose';
import { UserPayload } from '../middlewares/auth-middleware';
import { Todo, TodoModel } from '../models/todo-model';

export interface PaginationParams {
    page: string;
    take: string;
}

export class TodoService {
    createTodo(todoData: Omit<Todo, "created_at" | "updated_at">, user: UserPayload) {
        const todo = new TodoModel({
            ...todoData,
            user: { _id: user.id },
        });

        return todo.save();
    }

    getAllTodos(params: PaginationParams & { status: "pending" | "done" | "all" }, user: UserPayload) {
        const page = isNaN(Number(params.page)) ? 1 : Number(params.page);
        const take = isNaN(Number(params.take)) ? 1 : Number(params.take);

        const skip = (page - 1) * take;

        return TodoModel
            .aggregate([
                // Match the documents based on the query
                {
                    $match: {
                        ...(params.status !== "all" ? { status: params.status } : {}),
                        user: user.id,
                    }
                },

                // Use the facet stage to perform two operations
                {
                    $facet: {
                        // Get the total count
                        totalCount: [
                            { $count: "count" }
                        ],
                        // Get the documents with pagination
                        notes: [
                            { $sort: { created_at: -1 } },
                            { $skip: skip },
                            { $limit: take },
                        ]
                    }
                },

                // Project to get the count as a single value
                {
                    $project: {
                        notes: 1,
                        // Extract the first element of the totalCount array
                        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
                    }
                },
            ]);
    }

    getTodoById(id: string) {
        return TodoModel.findById(id);
    }

    updateTodoById(_id: string, user: Types.ObjectId, todoData: Omit<Todo, "created_at" | "updated_at">) {
        return TodoModel.findOneAndUpdate({ _id, user }, todoData, { new: true });
    }

    deleteTodoById(_id: string, user: Types.ObjectId) {
        return TodoModel.findOneAndDelete({ _id, user });
    }
}

export const todoService = new TodoService();
