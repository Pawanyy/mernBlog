import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import asyncHandler from './../middlewares/asyncHandler.js';

const authRouter = Router();

authRouter.route("/register").post(asyncHandler(register))

authRouter.route("/login").post(asyncHandler(login));

export default authRouter;