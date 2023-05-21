import express from  'express'
import { signIN, signUP } from '../controllers/user.js'
const userRouter  = express.Router();

userRouter.post('/signin', signIN);
userRouter.post('/signup',signUP);
export default userRouter;