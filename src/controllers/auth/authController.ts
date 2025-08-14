import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/userTypes";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {email} : User = req.body;
        const userExists = await userService.findUserByEmail(email);
        if (userExists) return res.status(400).json({ message: "User already exists" });
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error registering user" });
    }
}