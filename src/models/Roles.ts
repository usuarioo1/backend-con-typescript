import { Roles } from "../types/RolesType";
import mongoose, {Schema} from "mongoose";

const RolesSchema = new Schema<Roles>({
    name: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
}); 

export const RolesModel = mongoose.model<Roles>("Roles", RolesSchema);