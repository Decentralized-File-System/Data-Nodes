import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import api from "./routes";

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));

app.use("/api", api);

export default app;
