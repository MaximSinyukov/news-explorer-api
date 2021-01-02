const router = require('express').Router();

const usersRouter = require('./users').router;
const articlesRouter = require('./articles').router;
const otherRouter = require('./other').router;

router.use(
  usersRouter,
  articlesRouter,
  otherRouter,
);

module.exports = {
  router,
};
