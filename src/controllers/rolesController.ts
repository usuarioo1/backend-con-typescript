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

export const findRolesById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const role = await rolesService.findRolesById(id);
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            return res.json(role);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching role" });
        }
    };

export const createRol = async (req: Request, res: Response) => {
        try {
            const newRole = req.body;
            const result = await rolesService.createRoles(newRole);
            return res.status(201).json(result); // <- antes devolvías newUser y sobraba un paréntesis
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creating role" });
        }
    }

export const updateRol = async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedRole = req.body;
        try {
            const result = await rolesService.updateRoles(id, updatedRole);
            if (!result) {
                return res.status(404).json({ message: "Role not found" });
            }
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error updating role" });
        }
    }

export const deleteRol = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await rolesService.deleteRoles(id);
            if (!result) {
                return res.status(404).json({ message: "Role not found" });
            }
            return res.status(204).send(); // No content
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error deleting role" });
        }
    }