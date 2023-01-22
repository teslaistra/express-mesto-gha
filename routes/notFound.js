const router = require('express').Router();

const { NotFoundError } = require('../errors/404-error');

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
