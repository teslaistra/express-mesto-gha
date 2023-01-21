const Card = require('../models/card');

module.exports = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          next();
        } else {
          res.status(403).send({ message: 'Нет прав' });
        }
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
