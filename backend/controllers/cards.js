const Card = require('../models/card');
const NewError = require('../errors/error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') next(new NewError('Переданы некорректные данные при создании карточки.', 400));
      else next(e);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NewError('Карточка с указанным _id не найдена.', 404);
      }
      if (req.user._id !== card.owner.toHexString()) {
        throw new NewError('Вы не можете удалить чужой пост.', 403);
      } else {
        return Card.findByIdAndRemove(req.params.cardId);
      }
    })
    .then(() => {
      res.status(200).send({ message: 'Пост удалён' });
    })
    .catch((e) => {
      if (e.name === 'CastError') next(new NewError('Переданы некорректные данные.', 400));
      else next(e);
    });
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NewError('Передан несуществующий _id карточки.', 404);
      }
      res.status(200).send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') next(new NewError('Переданы некорректные данные для постановки/снятии лайка.', 400));
      else next(e);
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NewError('Передан несуществующий _id карточки.', 404);
      }
      res.status(200).send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') next(new NewError('Переданы некорректные данные для постановки/снятии лайка.', 400));
      else next(e);
    });
};
