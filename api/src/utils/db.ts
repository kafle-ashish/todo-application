import mongoose from "mongoose";
import { config } from "../config";

export function connectDb() {
    mongoose.connect(config.db.dbHost!)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
}