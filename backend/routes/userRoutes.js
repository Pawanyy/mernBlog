import { Router } from "express";
import UserModel from "../models/userModel.js";

const userRouter = Router();

userRouter.route("/").get(async (req, res) => {
    const users = await UserModel.find({});
    return res.json({ message: "this is users", users: users });
})

export default userRouter;