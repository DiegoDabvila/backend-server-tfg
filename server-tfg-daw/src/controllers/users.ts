import { Request, Response } from "express";
import { prisma } from "../index";
import crypto from "crypto";

export const getUsers = async (_, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      surnames: true,
      isAdmin: true,
    },
  });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, username, password, surnames, isAdmin } = req.body;
  const cryptoPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const users = await prisma.user.create({
    data: {
      name,
      username,
      surnames,
      password: cryptoPassword,
      isAdmin
    },
  });
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const deleted = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(202).json(deleted);
};

export const updateUser = async (req: Request, res: Response) => {
  const {name, username, surnames, isAdmin, password} = req.body;
  const cryptoPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const updated = await prisma.user.update({
    data: {
      name,
      username,
      surnames,
      password: cryptoPassword,
      isAdmin
    },
    where: { id: parseInt(req.params.id) },
  })
  res.json(updated);

}