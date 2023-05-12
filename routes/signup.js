const router = require('express').Router();

router.post('/signup', registerUserValidation, registerUser);

module.exports = router;