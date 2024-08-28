import express from "express";
import cors from "cors";
import "dotenv/config.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import appRouter from "./routes/appRoutes.js";
import morganHandler from './middlewares/morganHandler.js';

const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGIN }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(morganHandler)


app.use("/api/v3", appRouter)

app.use(notFoundHandler);

app.use(errorHandler)

export default app;