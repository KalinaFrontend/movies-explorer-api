const router = require('express').Router();

const { registerUserValidation } = require('../utils/validation');

router.post('/signup', registerUserValidation, );

module.exports = router;