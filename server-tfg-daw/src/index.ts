import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/auth";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { filmsRouter } from "./routes/films";
import morgan from "morgan";
import { directorsRouter } from "./routes/directors";
import { authJwt } from "./middleware/authentication";
import { usersRouter } from "./routes/users";

//Conf
export const prisma = new PrismaClient();
const port = 4000;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(passport.initialize());
//Passport

//Routes
app.use(authRouter);
app.use("/films", authJwt, filmsRouter);
app.use("/directors", authJwt, directorsRouter);
app.use("/users", authJwt, usersRouter);

//Listen
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
