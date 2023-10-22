import { Router } from "express";
import MenuController from "../controllers/menu-controller";
import authMiddleware from "../middlewares/auth";
export const menuRouter = Router();

menuRouter.get("/", MenuController.getAll);
menuRouter.patch("/:id", MenuController.editMenu);
menuRouter.post("/", MenuController.addProduct);
