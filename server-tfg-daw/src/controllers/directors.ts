import { Request, Response } from "express";
import { prisma } from "../index";
import { DirectorInterface } from "./interfaces/controllers.interface";



export const getAllDirectors = async (_, res: Response) => {
  const directors = await prisma.movieDirector.findMany();
  res.json(directors);
};

export const createDirector = async (req: Request, res: Response) => {
  const { name, bio, age, surnames } = req.body as DirectorInterface;
  const director = await prisma.movieDirector.create({
    data: {
      name,
      bio,
      age,
      surnames,
    },
  });

  res.json(director);
};

export const updateDirector = async (req: Request, res: Response) => {
  const { name, bio, age, surnames } = req.body as Partial<DirectorInterface>;
  const updated = await prisma.movieDirector.update({
    data: {
      name,
      bio,
      age,
      surnames,
    },
    where: { id: parseInt(req.params.id) },
  });

  res.json(updated);
};

export const deleteDirector = async (req: Request, res: Response) => {
  const deleted = await prisma.movieDirector.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json(deleted);
};

export const deleteDirectors = async (req: Request, res: Response) => {
  const { ids } = req.body;
  const deleteds = await prisma.movieDirector.deleteMany({
    where: {
      id: { in: ids },
    },
  });

  res.status(202).json(deleteds);
};
