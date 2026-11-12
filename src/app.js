import express from "express";
import morgan from "morgan";
import showsRouter from "./routes/shows.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/v1/shows", showsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;