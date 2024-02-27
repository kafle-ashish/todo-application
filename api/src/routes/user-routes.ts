import { Router } from 'express';
import { UserService } from '../services/user-service';
import { UserController } from '../controllers/user-controller';

export const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post(
    '/register',
    userController.registerUser,
);
userRouter.post(
    '/login',
    userController.loginUser,
);

