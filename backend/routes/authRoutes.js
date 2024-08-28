import { Router } from "express";
import { register, login, google } from "../controllers/authController.js";
import asyncHandler from './../middlewares/asyncHandler.js';

const authRouter = Router();

authRouter.route("/register").post(asyncHandler(register))

authRouter.route("/login").post(asyncHandler(login));

authRouter.route("/google").post(asyncHandler(google));

export default authRouter;