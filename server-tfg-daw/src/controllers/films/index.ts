import { Request, Response } from "express";
import { UserInterface } from "../interfaces/controllers.interface";
import { prisma } from "../../index";

export const getFilms = async (req: Request, res: Response) => {
  const user = req.user as UserInterface;
  const pres = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      rentedMovies: {
        include: {
          movie: {
            include: {
              director: true,
            },
          },
        },
      },
    },
  });

  res.send(pres?.rentedMovies);
};
