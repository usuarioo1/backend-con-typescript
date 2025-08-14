import mongoose, {Schema} from "mongoose";
import {User} from "../types/userTypes";
import bcrypt from "bcrypt";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: false, unique: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true, trim: true }
}, {
    timestamps: true,
    versionKey: false
}); 

userSchema.pre("save", async function(next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
    next();
});
export const UserModel = mongoose.model<User>("User", userSchema);  