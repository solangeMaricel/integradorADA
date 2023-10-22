import { Router } from "express";
import UserController from "../controllers/user-controller";
import authMiddleware from "../middlewares/auth";
export const userRouter = Router();

userRouter.post("/login", UserController.login);
userRouter.delete("/logout", authMiddleware, UserController.logout);
userRouter.delete("/:username", authMiddleware, UserController.deleteUser);
userRouter.patch("/:username", authMiddleware, UserController.updateUserData);
userRouter.post("/", authMiddleware, UserController.createUser);
