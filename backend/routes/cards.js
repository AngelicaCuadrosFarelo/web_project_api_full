import express from "express";
import {
  validateCardCreation,
  validateCardId,
} from "../middlewares/validation.js";

import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";

const routes = express.Router();

//crear carta
routes.get("/", getCards);
routes.post("/", validateCardCreation, createCard);
routes.delete("/:cardId", validateCardId, deleteCard);
routes.put("/:cardId/likes", validateCardId, likeCard);
routes.delete("/:cardId/likes", validateCardId, dislikeCard);

export default routes;
