import { Router } from 'express';
import UserController from '../controllers/user-controller';

export const userRouter = Router();

userRouter.post('/login', UserController.login);
userRouter.delete('/logout', UserController.logout);
userRouter.delete('/delete', UserController.deleteUser);
userRouter.patch('/:username', UserController.updateUserData);
userRouter.post('/', UserController.createUser);

