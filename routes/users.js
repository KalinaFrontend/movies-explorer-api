const router = require('express').Router();

const { updateUserInfoValidation } = require('../utils/validation');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidation,  updateUserInfo);

module.exports = router;