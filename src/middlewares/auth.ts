import { Request, Response, NextFunction } from "express"
import UserModel from "../models/user-model"

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body

  const isAuthorized = await UserModel.checkToken(token)

  if (!isAuthorized)
    return res.status(401).json({ message: "You're not authorized ..." })

  next()
}

export default isAuth
