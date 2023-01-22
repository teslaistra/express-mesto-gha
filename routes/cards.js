const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard, verifyOwnership,
} = require('../controllers/cards');

cardsRoutes.get('/cards', getCards);

cardsRoutes.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/cards/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24).required(),
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
        cardId: Joi.string().alphanum().length(24).required(),
      }),
  }),
  likeCard,
);

cardsRoutes.delete(
  '/cards/:cardId/likes',
  celebrate({
    params:
      Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
      }),
  }),
  dislikeCard,
);

module.exports = cardsRoutes;
