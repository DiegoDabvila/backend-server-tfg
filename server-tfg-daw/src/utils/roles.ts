import { NextFunction, Request, Response } from "express";
import {User} from "@prisma/client";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      status: "error",
      msg: "No se encontrón token",
    });
  }
  if (!(req.user as User).isAdmin) {
    return res.status(403).json({
      status: "error",
      msg: "No tienes rol de administrador",
    });
  }
  return next();
};
