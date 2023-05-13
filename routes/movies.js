const router = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

router.post('/', createMovieValidation, );
router.get('/', );
router.delete('/:id', deleteMovieValidation, );

module.exports = router;