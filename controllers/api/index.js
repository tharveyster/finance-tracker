const router = require('express').Router();
const userRoutes = require('./userRoutes');
const accountRoutes = require('./accountRoutes');
const mortgageRoutes = require('./mortgageRoutes');

router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);
router.use('/mortgages', mortgageRoutes);

module.exports = router;
