const router = require('express').Router();

const { setCurrentUserInfoValidation } = require('../utils/validation');

router.get('/me', );
router.patch('/me', setCurrentUserInfoValidation, );

module.exports = router;