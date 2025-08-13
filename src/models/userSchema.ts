import mongoose, {Schema} from "mongoose";
import {User} from "../types/userTypes";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: false, unique: true },
    email: { type: String, required: false, unique: true }
}, {
    timestamps: true,
    versionKey: false
}); 

export const UserModel = mongoose.model<User>("User", userSchema);