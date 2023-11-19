import { Request, Response } from "express";
import { prisma } from "../../index";
import { DirectorInterface } from "../interfaces/controllers.interface";

interface NewFilmResquest {
  name: string;
  year: number;
  score: number;
  imageUrl: string;
  directorId?: number;
  director?: DirectorInterface;
}

interface UpdateFilmBody extends Partial<NewFilmResquest> {}

export const getAllFilms = async (_, res: Response) => {
  const movies = await prisma.rentedMovie.findMany({
    include: {
      users: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              surnames: true
            },
          },
        },
      },
      director: true,
    },
  });

  res.status(200).json(movies);
};

export const getFilmById = async (req: Request, res: Response) => {
  const {id} = req.params;
  console.log(id);
  try {
    const movie = await prisma.rentedMovie.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        director: true,
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                surnames: true
              }
            }
          }
        }
      }
    });
    if (!movie) {
      return res.status(404).json({error: "La película no fue encontrada"});
    }
    return res.status(200).json(movie);
  }catch (error) {
    return res.status(500).json({error: "Error al buscar la película"});
  }
}

export const postNewFilm = async (req: Request, res: Response) => {
  const { name, year, score, imageUrl, directorId, director } =
    req.body as NewFilmResquest;
  if (!director && !directorId) {
    res.status(400).json({
      status: "error",
      msg: "Se debe proporcionar un director",
    });
    return;
  } else if (director && directorId) {
    res.status(400).json({
      status: "error",
      msg: "Error interno",
    });
    return;
  } else if (directorId) {
    const movie = await prisma.rentedMovie.create({
      data: {
        name,
        year,
        score,
        imageUrl,
        directorId: directorId,
      },
    });
    res.status(201).json(movie);
    return;
  } else if (director) {
    const movie = await prisma.rentedMovie.create({
      data: {
        name,
        year,
        score,
        imageUrl,
        director: {
          create: director,
        },
      },
    });

    res.status(201).json(movie);
    return;
  }
  res.status(500).json({
    status: "error",
    msg: "Error interno",
  });
};

export const updateFilm = async (req: Request, res: Response) => {
  const { name, year, score, imageUrl } =
    req.body as UpdateFilmBody;
  const movie = await prisma.rentedMovie.update({
    data: {
      name,
      year,
      score,
      imageUrl
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(movie);
};

export const deleteFilm = async (req: Request, res: Response) => {
  const deleted = await prisma.rentedMovie.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(202).json(deleted);
};

export const deleteFilms = async (req: Request, res: Response) => {
  const { ids } = req.body;
  const deleteds = await prisma.rentedMovie.deleteMany({
    where: {
      id: { in: ids },
    },
  });

  res.status(202).json(deleteds);
};

export const relationUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, asignnationDate, expirationTime } = req.body;

  const relationed = await prisma.usersOnMovies.create({
    data: {
      movieId: Number(id),
      userId,
      asignnationDate,
      expirationTime,
    },
  });

  res.status(200).json(relationed);
};
