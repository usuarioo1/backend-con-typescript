import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService, User } from "types/userTypes"; // <- agrego User si no lo habías importado
import { Router } from "express";
import { IRolesRepository, IRolesService } from "../types/RolesType" // <- asegúrate de que estas interfaces existan
import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesService } from "@services/RolesService";
import { createUser, deleteUser, findUser, findUserById, updateUser } from "@controllers/usersController";
import { findRoles } from "@controllers/rolesController";

const router: Router = Router();

export default () => {
    // Ruta de health check
    router.get("/health", async (req, res ) => {
        res.status(200).json({ message: "API is running" });
    } );

    // Ruta para obtener usuarios
    router.get("/users", findUser );

    router.get("/users/:id", findUserById )

    // Ruta para crear un usuario
    router.post("/users", createUser  );

    router.put("/users/:id", updateUser );

    router.delete("/users/:id", deleteUser);

    //UserRoles

    router.get("/roles", findRoles);

    router.get("/roles/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const user = await rolesService.findRolesById(id);
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
    router.post("/roles", async (req, res) => {
        try {
            const newUser: User = req.body;
            const result = await rolesService.createRoles(newUser);
            return res.status(201).json(result); // <- antes devolvías newUser y sobraba un paréntesis
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creating user" });
        }
    });

    router.put("/roles/:id", async (req, res) => {
        const { id } = req.params;
        const updatedUser: User = req.body;
        try {
            const result = await rolesService.updateRoles(id, updatedUser);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error updating user" });
        }
    });

    router.delete("/roles/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const result = await rolesService.deleteRoles(id);
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
