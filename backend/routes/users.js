const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers,
  getUser,
  setUserInfo,
  setAvatar,
  getUserById,
} = require('../controllers/users');
const { regex } = require('../utils/constants');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), setUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).pattern(regex),
  }),
}), setAvatar);

module.exports = router;
