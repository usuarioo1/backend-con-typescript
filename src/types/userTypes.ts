import { Document } from "mongoose";
import { Repository, Query } from "./RepositoryTypes";

export interface User extends Document {
    name: string;
    username: string;
    email : string;
    password: string
}

export interface IUserRepository extends Repository<User>{

    findOne(query : Query): Promise<User | null>;
};

export interface IUserService {
    createUser(data: User): Promise<User>;
    findUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(id: string, user: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
}