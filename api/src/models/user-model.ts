import mongoose, { Document } from 'mongoose';
import { config } from '../config';
import { compare, hash } from 'bcrypt';

export interface User extends Document {
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

userSchema.pre<User>('save', async function (next) {
    if (this.isModified('password')) {
        const hashed = await hash(this.password, 10);
        this.password = hashed;
    }
    next();
});

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<User>(config.db.userCollection, userSchema);

export default UserModel;
