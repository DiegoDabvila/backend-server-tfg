import { Router } from "express";
import { getFilms } from "../controllers/films";
import {
  deleteFilm,
  deleteFilms,
  getAllFilms,
  postNewFilm,
  relationUser,
  updateFilm,
} from "../controllers/films/admin";
import { checkAdmin } from "../utils/roles";

export const filmsRouter = Router();

filmsRouter.get("/", getFilms);

filmsRouter.get("/admin", checkAdmin, getAllFilms);
filmsRouter.post("/admin", checkAdmin, postNewFilm);
filmsRouter.put("/admin/:id", checkAdmin, updateFilm);
filmsRouter.delete("/admin/:id", checkAdmin, deleteFilm);
filmsRouter.post("/admin/delete", checkAdmin, deleteFilms);
filmsRouter.post("/admin/relation", checkAdmin, relationUser);
