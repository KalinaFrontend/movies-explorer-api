const router = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', createMovieValidation, createMovie);
router.get('/', getMovies);
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;