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
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
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

userRoutes.patch('/users/me', (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }).then((user) => {
    if (user) {
      res.send({ data: user });
    } else {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
  })
    .catch((err) => res.status(500).send({ message: err.message }));
});

userRoutes.patch('/users/me/avatar', (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }).then((user) => {
    if (user) {
      res.send({ data: user });
    } else {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
  })
    .catch((err) => res.status(500).send({ message: err.message }));
});

module.exports = userRoutes;
