const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
} = require('../controllers/cards');
const { regex } = require('../utils/constants');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(regex),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), setLike);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteLike);

module.exports = router;
