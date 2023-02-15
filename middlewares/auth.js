const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnAuthorizedError = require('../errors/401-error');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnAuthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
