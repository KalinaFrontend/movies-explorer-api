const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { compare } = require('bcryptjs');

const { Schema } = mongoose;

const {
  UnauthorizedError,
} = require('../utils/errors/UnauthorizedError');


const { EMAIL_REGEX } = require('../utils/validation');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => EMAIL_REGEX.test(email),
        message: 'Требуется ввести электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
      },
    },
  },

  {
    statics: {
      findUserByCredentials(email, password) {
        return (
          this
            .findOne({ email })
            .select('+password')
        )
          .then((user) => {
            if (user) {
              return compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  return Promise.reject(new UnauthorizedError('Неверная почта или пароль'));
                });
            }

            return Promise.reject(new UnauthorizedError('Неверная почта или пароль'));
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);