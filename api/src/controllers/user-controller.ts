import { Handler } from 'express';
import { UserService } from '../services/user-service';

export class UserController {
    constructor(private readonly userService: UserService) {
    }

    registerUser: Handler = async (req, res, next) => {
        try {
            const response = await this.userService.registerUser(req.body);
            console.log(response);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    loginUser: Handler = async (req, res, next) => {
        try {
            const response = await this.userService.loginUser(req.body);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}
