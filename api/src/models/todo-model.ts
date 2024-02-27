import mongoose, { Types } from 'mongoose';
import { config } from '../config';
import { User } from './user-model';

export interface Todo {
    title: string;
    description?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
    user: User;
}

const todoSchema = new mongoose.Schema<Todo>(
    {
        title: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'done'],
            default: 'pending',
        },

        description: {
            type: String
        },

        user: {
            type: Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

export const TodoModel = mongoose.model<Todo>(config.db.todoCollection, todoSchema);
