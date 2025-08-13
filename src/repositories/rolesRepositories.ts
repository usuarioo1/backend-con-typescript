import { IRolesRepository, Roles } from "../types/RolesType";
import { RolesModel } from "../models/Roles";


export class RolesRepository implements IRolesRepository{
    private Roless : Roles[] = [];

    async create(data: Roles): Promise<Roles> {
        const newRoles = new RolesModel(data)
        return await newRoles.save();
    }

    async find(): Promise<Roles[]> {
        return await RolesModel.find().exec();
    }

    async findById(id: string): Promise<Roles | null> {
        return await RolesModel.findById(id).exec();
    }

    async update(id: string, data: Partial<Roles>): Promise<Roles | null> {
        return await RolesModel.findByIdAndUpdate(id, data, { new: true }).exec();   
    }

    async delete(id: string): Promise<boolean> {
        const result = await RolesModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

}   