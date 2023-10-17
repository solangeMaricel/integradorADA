import { Request, Response } from "express";
import UserModel from "../models/user-model";
import { validateUser, validatePartialUser } from "../schemas/user-schema";

abstract class UserController {

    static async login(req: Request, res: Response) {
        const validatedData = validatePartialUser(req.body);
    
        if (!validatedData.success)
          return res
            .status(400)
            .json({ error: JSON.parse(validatedData.error.message) });
    
        const userLogged = await UserModel.login(req.body);
    
        if (userLogged === 404)
          return res.status(404).json({ message: "Username does not exists..." });
    
        if (userLogged === 401)
          return res.status(401).json({ message: "Wrong password" });
    
        res
          .status(201)
          .json({ message: "User logged successully", token: userLogged });
      }

      static async createOrder(req: Request, res: Response) {
      
      }


    }


    export default UserController;