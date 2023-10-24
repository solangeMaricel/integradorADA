import { Request, Response } from "express"
import UserModel from "../models/user-model"
import { validatePartialUser, validateUser } from "../schemas/user-schema"

abstract class UserController {

  static async createUser(req: Request, res: Response) {
    const validatedData = validateUser(req.body);

    if (!validatedData.success)
      return res
        .status(400)
        .json({ error: JSON.parse(validatedData.error.message) });

    const newUser = await UserModel.createUser(req.body);

    if (newUser === 400)
      return res.status(400).json({ message: "Username already exists..." });

    res.status(201).json(newUser);
  };

  static async login(req: Request, res: Response) {
    const validatedData = validatePartialUser(req.body);
    const userLogged = await UserModel.login(req.body);

    if (!validatedData.success)
      return res
        .status(400)
        .json({ error: JSON.parse(validatedData.error.message) });

    if (userLogged === 404)
      return res.status(404).json({ message: "Username does not exists..." });
    if (userLogged === 400)
      return res.status(400).json({ message: "Wrong Password" });
    res
      .status(201)
      .json({ message: "User logged successully", token: userLogged });
  };

  static async logout(req: Request, res: Response) {
    const validatedData = validatePartialUser(req.body);

    if (!validatedData.success)
      return res
        .status(400)
        .json({ error: JSON.parse(validatedData.error.message) });

    const userLoggedOut = await UserModel.logout(req.body);

    if (userLoggedOut === 404)
      return res.status(404).json({ message: "Username not found" });

    if (userLoggedOut === 200)
      return res.status(200).json({ message: "Logout successfully" });

    res.status(400).json({
      message: "Ups, something wrong happend. Check your params and try again"});
  };

  static async deleteUser(req: Request, res: Response) {
    const userDeleted = await UserModel.deleteUser(req.body)

    if (userDeleted === 404)
      return res.status(404).json({ message: "Username not found" });

    if (userDeleted === 200)
      return res.status(200).json({ message: "User deleted successfully" });

    res.status(400).json({
      message: "Ups, something wrong happend. Check your params and try again",
    });
  };

  static async updateUserData(req: Request, res: Response) {
    const { username } = req.params;
    const { password, rol } = req.body;

    const validatedData = validatePartialUser({ username, password });

    if (!validatedData.success)
      return res
        .status(400)
        .json({ error: JSON.parse(validatedData.error.message) });

    const userUpdated = await UserModel.updateUserData({
      username,
      password,
      rol,
    });

    if (userUpdated === 404)
      return res.status(404).json({ message: "Username not found" });

    res.status(200).json({ message: "Data changed successfully" });
  };
};

export default UserController;
