require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const CentralError = require('./utils/errors/CentralError'); //500

const { MONGODB_URL } = require('./utils/constants');

 const { PORT = 3000 } = process.env;

 const app = express();
 app.use(express.json());
 app.use(cors());
 app.use(helmet());
 app.use(express.json());

mongoose.set('strictQuery', false);
 mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(CentralError);

 app.listen(PORT, () => {
  console.log (`App listening on port ${PORT}`);
 })