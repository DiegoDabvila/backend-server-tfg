import { Router } from "express";
import { login, register, verifyToken } from "../controllers/login";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/checkToken", verifyToken);
