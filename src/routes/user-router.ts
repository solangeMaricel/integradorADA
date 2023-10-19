import { Router } from 'express';
import UserController from '../controllers/user-controller';

export const userRouter = Router();


// /api/users'
// TODO middleware (Sol)
// add user (Mar)
// delete user ( Ali)
// edit user (ali)
//zod (Sol)
userRouter.post('/login', UserController.login);
