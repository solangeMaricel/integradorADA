import { Router } from 'express';
import UserController from '../controllers/user-controller';

export const userRouter = Router();


// /api/users'
userRouter.post('/login', UserController.login);
