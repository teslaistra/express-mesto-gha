const Card = require('../models/card');

const NotFoundError = require('../errors/404-error');
const ValidationError = require('../errors/400-error');
const ForbiddenError = require('../errors/403-error');

module.exports = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          next();
        } else {
          throw new ForbiddenError('Нет прав на удаление карточки');
        }
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации данных'));
      }
      next(err);
    });
};
