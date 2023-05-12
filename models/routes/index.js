const router = require('express').Router();

const routeUsers = require('./users');
const routeMovies = require('./movies');


router.use('/', routeSignup);
router.use('/', routeSignin);


router.use('/users', routeUsers);
router.use('/movies', routeMovies);


module.exports = router;