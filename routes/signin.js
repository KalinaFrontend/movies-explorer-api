const router = require('express').Router();

const { loginUserValidation } = require('../utils/validation');

router.post('/signin', loginUserValidation, );

module.exports = router;