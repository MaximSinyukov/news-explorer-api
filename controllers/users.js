const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

const getUserById = (req, res, next) => User.findById(req.user._id)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь с таким id не найден.'));
    }
    next(err);
  });

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      const {
        email, password, name,
      } = req.body;
      return User.create({
        email, password, name,
      })
        .then(() => {
          res.status(201).send({ email });
        })
        .catch((err) => {
          if (err.name === 'MongoError') {
            next(new ConflictError('К данной почте уже привязан аккаунт'));
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports = {
  login,
  getUserById,
  createUser,
};
