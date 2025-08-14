import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { IUserRepository, IUserService, User } from "types/userTypes"; // <- agrego User si no lo habías importado
import { Router } from "express";
import { IRolesRepository, IRolesService } from "../types/RolesType" // <- asegúrate de que estas interfaces existan
import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesService } from "@services/RolesService";
import { createUser, deleteUser, findUser, findUserById, updateUser } from "@controllers/usersController";
import { createRol, deleteRol, findRoles, findRolesById, updateRol } from "@controllers/rolesController";
import { registerUser } from "@controllers/auth/authController";

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

    router.get("/roles/:id", findRolesById);

    // Ruta para crear un usuario
    router.post("/roles", createRol );

    router.put("/roles/:id", updateRol);

    router.delete("/roles/:id", deleteRol);


    // Ruta para registrar un usuario
    router.post("/register", registerUser);


    return router;
};
