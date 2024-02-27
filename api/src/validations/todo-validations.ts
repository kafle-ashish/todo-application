import Joi from 'joi';

const TITLE_MESSAGE = 'Title must be at least 3 characters long';

export const createTodoValidationSchema = Joi.object({
    title: Joi.string().required().min(3).message(TITLE_MESSAGE),
    description: Joi.string().optional().allow(''),
    status: Joi.string().valid('pending', 'done').optional(),
});

export const updateTodoValudationSchema = Joi.object({
    title: Joi.string().optional().min(3).message(TITLE_MESSAGE),
    description: Joi.string().optional().allow(''),
    status: Joi.string().valid('pending', 'done').optional(),
}).min(1);