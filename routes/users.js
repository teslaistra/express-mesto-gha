const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regexURL } = require('../utils/constants');
const {
  getUsers, getUser, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);

userRoutes.get('/users/me', getMe);

userRoutes.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getUser,
);

userRoutes.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

userRoutes.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(regexURL),
    }),
  }),
  updateAvatar,
);

module.exports = userRoutes;
