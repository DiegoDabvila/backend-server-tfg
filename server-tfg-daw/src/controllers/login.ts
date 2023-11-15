import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../index";
import { LoginRequestBodyInterface } from "./interfaces/controllers.interface";



export const login = async (req: Request<LoginRequestBodyInterface>, res: Response) => {
  console.log(req.body);
  if (!req.body.user || !req.body.password) {
    res.status(400).json({
      status: "error",
      error: "Se requiere usuario y contraseña",
    });
    return;
  }

  const cryptoPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: { username: req.body.user, password: cryptoPassword },
    select: {
      username: true,
      name: true,
      surnames: true,
      isAdmin: true,
    },
  });

  console.log(user);

  if (!user) {
    res.status(401).json({
      status: "error",
      error: "Nombre de usuario o contraseña incorrectos",
    });
    return;
  }

  const token = jwt.sign({ user }, process.env.JWT_KEY || "", {
    expiresIn: "12h",
  });

  res.json({
    status: "ok",
    token,
  });
};


export const verifyToken = async (req: Request<{token: string}>, res: Response) => {
  const token = req.body.token;
  const secretKey = process.env.JWT_KEY as string; 

  try {
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, secretKey);
    
    return res.status(200).json(decoded);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}