import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService, User } from "types/userTypes"; // <- agrego User si no lo habías importado
import { Router } from "express";

const router: Router = Router();

// Instanciamos repositorio y servicio
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export default () => {
    // Ruta de health check
    router.get("/health", (req, res) => {
        res.status(200).json({ message: "API is running" });
    });

    // Ruta para obtener usuarios
    router.get("/users", async (req, res) => {
        try {
            const users = await userService.findUsers();
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users" });
        }
    });

    router.get("/users/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const user = await userService.findUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching user" });
        }
    });

    // Ruta para crear un usuario
    router.post("/users", async (req, res) => {
        try {
            const newUser: User = req.body;
            const result = await userService.createUser(newUser);
            return res.status(201).json(result); // <- antes devolvías newUser y sobraba un paréntesis
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creating user" });
        }
    });

    router.put("/users/:id", async (req, res) => {
        const { id } = req.params;
        const updatedUser: User = req.body;
        try {
            const result = await userService.updateUser(id, updatedUser);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error updating user" });
        }
    });

    router.delete("/users/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const result = await userService.deleteUser(id);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(204).send(); // <- devuelve 204 No Content
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error deleting user" });
        }
    });

    return router;
};
