const { celebrate, Joi } = require('celebrate');

// REGEX
const EMAIL_REGEX = /.+@.+\..+/;
const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// USERS
const createValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(PASSWORD_REGEX),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(PASSWORD_REGEX),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REGEX),
    name: Joi.string().required().min(2).max(30),
  }),
});

// MOVIES
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEX),
    trailer: Joi.string().required().pattern(URL_REGEX),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  URL_REGEX,

  createValidation,
  loginValidation,

  updateUserInfoValidation,

  createMovieValidation,
  deleteMovieValidation,
};
