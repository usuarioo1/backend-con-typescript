import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService, User } from "../types/userTypes"
import { Request, Response } from "express";

// Crear instancias con inyección de dependencias
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUser = async (req: Request, res: Response) => {
    try {
        const users = await userService.findUsers(); // Usar la instancia
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
}

export const findUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.findUserById(id); // Usar la instancia
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching user" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser: User = req.body;
        const result = await userService.createUser(newUser); // Usar la instancia
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser: User = req.body;
    try {
        const result = await userService.updateUser(id, updatedUser); // Usar la instancia
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating user" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUser(id); // Usar la instancia
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
}