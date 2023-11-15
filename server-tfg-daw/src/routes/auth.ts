import { Router } from "express";
import { login, verifyToken } from "../controllers/login";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/checkToken", verifyToken);
