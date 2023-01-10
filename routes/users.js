const userRoutes = require('express').Router();

const User = require('../models/user');

userRoutes.get('/users', (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

userRoutes.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

userRoutes.post('/users', (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

module.exports = userRoutes;
