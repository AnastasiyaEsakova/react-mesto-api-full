const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NewError = require('../errors/error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const {
        name, about, avatar, email,
      } = user;
      res.send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NewError('Пользователь по указанному _id не найден.', 404);
      }
      const {
        name, about, avatar, email,
      } = user;
      res.send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch((e) => {
      if (e.name === 'CastError') next(new NewError('Переданы некорректные данные.', 400));
      else next(e);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const result = User.create({
        name, about, avatar, email, password: hash,
      });
      return result;
    })
    .then(() => {
      res.status(200).send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') next(new NewError('Переданы некорректные данные при создании пользователя.', 400));
      else if (e.code === 11000) next(new NewError('Пользователь с такой почтой уже существует.', 409));
      else next(e);
    });
};

module.exports.setUserInfo = (req, res, next) => {
  const {
    name, about,
  } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      const {
        avatar, email,
      } = user;
      res.status(200).send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.name === 'CastError') next(new NewError('Переданы некорректные данные при обновлении профиля.', 400));
      else next(e);
    });
};

module.exports.setAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      const {
        name, about, email,
      } = user;
      res.status(200).send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.name === 'CastError') next(new NewError('Переданы некорректные данные при обновлении аватара.', 400));
      else next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: 3600000 });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
        .send({ token });
    })
    .catch(() => {
      next(new NewError('Передан неверный логин или пароль.', 401));
    });
};
