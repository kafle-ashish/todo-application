import UserModel, { User } from "../models/user-model";
import { sign } from "jsonwebtoken";
import { config } from "../config";

export class UserService {

    getUserById(userId: string): Promise<User | null> {
        return UserModel.findById(userId);
    }

    updateUserById(userId: string, userData: Partial<User>): Promise<User | null> {
        return UserModel.findByIdAndUpdate(userId, userData, { new: true });
    }

    deleteUserById(userId: string): Promise<User | null> {
        return UserModel.findByIdAndDelete(userId);
    }

    registerUser = async (userPayload: User) => {
        const { email, password } = userPayload;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            throw Error("Email already in use!");
        }

        const user = new UserModel({ email, password });
        await user.save();

        const userJwt = sign({
            id: user._id,
            email: user.email,
        }, config.jwtKey);

        return { user, token: userJwt };
    };

    loginUser = async (userPayload: Pick<User, "email" | "password">) => {
        const { email, password } = userPayload;
        const user = await UserModel.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            throw Error("Invalid credentials!");
        }

        const userJwt = sign({
            id: user._id,
            email: user.email,
        }, config.jwtKey);

        return { user, token: userJwt };
    }
}
