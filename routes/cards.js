const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const cardUser = require('../middlewares/userCard');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/cards', getCards);

cardsRoutes.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(URL),
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
  cardUser,
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
