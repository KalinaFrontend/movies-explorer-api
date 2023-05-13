const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGODB_URL } = require('./utils/constants');

 const { PORT = 3000 } = process.env;

 const app = express();
 app.use(express.json());
 app.use(cors());

mongoose.set('strictQuery', false);
 mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

 app.listen(PORT, () => {
  console.log (`App listening on port ${PORT}`);
 })