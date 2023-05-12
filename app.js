const express = require('express');
const mongoose = require('mongoose');

 const { PORT = 3000 } = process.env;

 const app = express();
 app.use(express.json());

mongoose.set('strictQuery', false);
 mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

 app.listen(PORT, () => {
  console.log (`App listening on port ${PORT}`);
 })