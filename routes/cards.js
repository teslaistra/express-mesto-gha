const cardsRoutes = require('express').Router();

const Card = require('../models/card');

cardsRoutes.get('/cards', (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(res.status(500).send({ message: 'На сервере произошла ошибка' }));
});

cardsRoutes.post('/cards', (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
});

cardsRoutes.delete('/cards/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Card not found!' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
});

cardsRoutes.put('/cards/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ data: card });
    } else {
      res.status(404).send({ message: 'Card not found!' });
    }
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
});

cardsRoutes.delete('/cards/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ data: card });
    } else {
      res.status(404).send({ message: 'Card not found!' });
    }
  }).catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(400).send({ message: err.message });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  });
});

module.exports = cardsRoutes;
