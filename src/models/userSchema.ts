import mongoose, {Schema} from "mongoose";
import {User} from "../types/userTypes";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    versionKey: false
}); 

export const UserModel = mongoose.model<User>("User", userSchema);