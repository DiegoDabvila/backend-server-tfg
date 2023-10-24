import { Router } from "express";
import { login } from "../controllers/login";

export const authRouter = Router();

authRouter.post("/login", login);
