const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);

userRoutes.get(
  '/users/me',
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
  }),
  getMe,
);

userRoutes.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
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
      avatar: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    }),
  }),
  updateAvatar,
);

module.exports = userRoutes;
