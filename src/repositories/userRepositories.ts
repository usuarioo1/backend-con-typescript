import { UserModel } from "@models/userSchema";
import { Query } from "types/RepositoryTypes";
import { IUserRepository, User } from "types/userTypes";

export class UserRepository implements IUserRepository {
    private users : User[] = [];

    async create(data: User): Promise<User> {
        const newUser = new UserModel(data)
        return await newUser.save();
    }

    async find(): Promise<User[]> {
        return await UserModel.find().exec();
    }
    
    async findOne(query: Query): Promise<User | null> {
        return await UserModel.findOne(query)
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).exec();
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(id, data, { new: true }).exec();   
    }

    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

}   