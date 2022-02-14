require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { checkCors } = require('./middlewares/cors');
const { login, createUser } = require('./controllers/users');
const NewError = require('./errors/error');
const { regex } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', (err) => {
  if (err) throw new Error('error');
});

app.use(checkCors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).trim(true),
    about: Joi.string().min(2).trim(true),
    avatar: Joi.string().min(2).pattern(regex),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(2),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(2),
  }),
}), login);

app.use(auth);

app.get('/signout', (req, res) => {
  res.status(200).clearCookie('jwt', {
    maxAge: 3600000,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }).send({ message: 'Выход' });
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  next(new NewError('Маршрут не найден', 404));
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = app;
