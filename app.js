const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const notFoundRoute = require('./routes/notFound');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(errors());

app.use(userRoute);
app.use(cardRoute);

app.use(notFoundRoute);
app.listen(PORT);
