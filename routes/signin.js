const router = require('express').Router();


router.post('/signin', loginUserValidation, loginUser);

module.exports = router;