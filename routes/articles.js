const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteArticle);

router.get('/articles', getAllArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(new RegExp(/https?:\/\/(www\.)?[-0-9/a-z()@:%.+~#=_]+\.{1}[a-z0-9]+\b[//a-z0-9()@:%_+.~#?&=]*/mi)),
    image: Joi.string().required().pattern(new RegExp(/https?:\/\/(www\.)?[-0-9/a-z()@:%.+~#=_]+\.{1}[a-z0-9]+\b[//a-z0-9()@:%_+.~#?&=]*/mi)),
  }),
}), createArticle);

module.exports = {
  router,
};
