const Card = require('../models/card');
const NotFoundError = require('../errors/404-error');
const ForbiddenError = require('../errors/403-error');
const ValidationError = require('../errors/400-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.verifyOwnership = (req, res, next) => {
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
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Передан некорретный Id'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ data: card });
    } else {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Передан некорретный Id'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ data: card });
    } else {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      return next(new ValidationError('Передан некорретный Id'));
    }
    return next(err);
  });
};
