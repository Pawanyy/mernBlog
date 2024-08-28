import { Router } from "express";

import userRouter from "./userRoutes.js";
import authRouter from './authRoutes.js';

const appRouter = Router();

appRouter.use("/users", userRouter);

appRouter.use("/auth", authRouter)

appRouter.route("/test").get((req, res) => {
    return res.json({ message: "this is test" })
})


export default appRouter;