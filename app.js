const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '63b9dcff27d03005e05cdaa4',
  };
  next();
});

app.use(userRoute);
app.use(cardRoute);

app.listen(PORT);
