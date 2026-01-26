import express from "express";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import mongoose from "mongoose";
import auth from "./middlewares/auth.js";
import cors from "cors";
import { login, createUser } from "./controllers/users.js";
import errorHandler from "./middlewares/errorHandler.js";
import { errors } from "celebrate";
import {
  validateLogin,
  validateUserCreation,
} from "./middlewares/validation.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";
import "dotenv/config";

const app = express();
app.use(cors());
//app.options("*", cors());
app.use(requestLogger);
app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signup", validateUserCreation, createUser);
app.post("/signin", validateLogin, login);
app.use(auth);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);
app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  const error = new Error("Recurso solicitado no encontrado");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);
mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(3000, function () {
  console.log("Servidor encendido en el puerto 3000");
});
