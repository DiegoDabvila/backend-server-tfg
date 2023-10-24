import { Router } from "express";
import {
  createDirector,
  deleteDirector,
  deleteDirectors,
  getAllDirectors,
  updateDirector,
} from "../controllers/directors";
import { checkAdmin } from "../utils/roles";

export const directorsRouter = Router();

directorsRouter.get("/", checkAdmin, getAllDirectors);
directorsRouter.post("/", checkAdmin, createDirector);
directorsRouter.put("/:id", checkAdmin, updateDirector);
directorsRouter.delete("/:id", checkAdmin, deleteDirector);
directorsRouter.post("/delete", checkAdmin, deleteDirectors);
