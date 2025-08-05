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

    return router;
};
