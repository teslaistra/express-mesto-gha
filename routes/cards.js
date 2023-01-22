const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard, verifyOwnership,
} = require('../controllers/cards');
const { regexURL } = require('../utils/constants');

cardsRoutes.get('/cards', getCards);

cardsRoutes.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regexURL),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/cards/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  verifyOwnership,
  deleteCard,
);

cardsRoutes.put(
  '/cards/:cardId/likes',
  celebrate({
    params:
      Joi.object().keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  likeCard,
);

cardsRoutes.delete(
  '/cards/:cardId/likes',
  celebrate({
    params:
      Joi.object().keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  dislikeCard,
);

module.exports = cardsRoutes;
