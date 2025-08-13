import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesService } from "@services/RolesService";
import { IRolesRepository, IRolesService } from "../types/RolesType";
import { Response, Request } from "express";



const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const findRoles = async (req: Request, res: Response) => {
        try {
            const roles = await rolesService.findRoles();
            return res.json(roles);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users" });
        }
    }