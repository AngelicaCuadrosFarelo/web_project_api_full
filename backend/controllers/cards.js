import Card from "../models/card.js";

export async function createCard(req, res, next) {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.status(201).send(card);
  } catch (err) {
    next(err);
  }
}

export async function deleteCard(req, res, next) {
  const { cardId } = req.params;

  const userId = req.user._id;
  const currentCard = await Card.findById(cardId);
  if (userId !== currentCard.owner.toString()) {
    const error = new Error("No tienes permisos para eliminar la tarjeta");
    error.statusCode = 401;
    return next(error);
  }
  const card = await Card.findByIdAndDelete(cardId);

  if (card) {
    return res.send({ message: "Card eliminada" });
  } else {
    const error = new Error("Tarjeta no encontrada");
    error.statusCode = 404;
    return next(error);
  }
}

export async function getCards(req, res, next) {
  try {
    const userId = req.user._id;
    const cards = await Card.find({});
    const cardsWithStatus = cards.map((card) => {
      const cardObj = card.toObject();
      cardObj.isLiked = card.likes.some((id) => id.equals(userId));
      return cardObj;
    });

    res.json(cardsWithStatus);
  } catch (err) {
    next(err);
  }
}

export async function likeCard(req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
      { new: true },
    );

    if (!card) {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      return next(error);
    }

    const cardData = card.toObject();
    cardData.isLiked = true;
    res.send(cardData);
  } catch (err) {
    next(err);
  }
}

export async function dislikeCard(req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // elimina _id del array
      { new: true },
    );
    if (!card) {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      return next(error);
    }
    const cardData = card.toObject();
    cardData.isLiked = false;
    res.send(cardData);
  } catch (errs) {
    next(error);
  }
}
