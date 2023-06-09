const INACCURATE_DATA_ERROR = require('../utils/errors/InaccurateDataError'); // 400
const FORBIDDEN_ERROR = require('../utils/errors/ForbiddenError'); // 403
const NOT_FOUND_ERROR = require('../utils/errors/NotFoundError'); // 404

const Movie = require('../models/movie');

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      owner: _id,
      movieId,
    })
    .then(() => res.status(201).send({ message: 'Фильм успешно сохранен' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new INACCURATE_DATA_ERROR('Переданы некорректные данные при сохранении фильма'));
      } else {
        next(err);
      }
    });
}

function getMovies(req, res, next) {
  const { _id } = req.user;

  Movie
    .find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (movies) return res.send(movies);

      throw new NOT_FOUND_ERROR('Данные фильмов пользователя с указанным id не найдены');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new INACCURATE_DATA_ERROR('Передан некорректный id пользователя'));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) throw new NOT_FOUND_ERROR('Данные фильма по указанному id не найдены');

      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) {
        throw new FORBIDDEN_ERROR('Нет прав доступа для удаления фильма');
      }

      movie
        .deleteOne()
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
