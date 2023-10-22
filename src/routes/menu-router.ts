import { Router } from "express";
import MenuController from "../controllers/menu-controller";
import authMiddleware from "../middlewares/auth";
export const menuRouter = Router();

menuRouter.get("/", MenuController.getAll);
menuRouter.patch("/:id", authMiddleware, MenuController.editMenu);
menuRouter.post("/", authMiddleware, MenuController.addProduct);
menuRouter.delete("/:id", authMiddleware, MenuController.deleteProduct);
