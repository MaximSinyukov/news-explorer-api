const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

const getAllArticles = (req, res, next) => Article.find({ owner: req.user._id })
  .then((articles) => res.status(200).send(articles))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Произошла ошибка запроса.'));
    }
    next(err);
  });

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  return Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .then((article) => {
      if (JSON.stringify(req.user._id) !== JSON.stringify(article.owner)) {
        throw new ForbiddenError('У Вас недостаточно прав для выполнения этой операции');
      }
      return Article.findByIdAndRemove(req.params.id)
        .then((removeArticle) => res.status(200).send(removeArticle));
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        next(new NotFoundError('Статья с таким id не найдена.'));
      }
      next(err);
    });
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
