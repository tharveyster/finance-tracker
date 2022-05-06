const router = require('express').Router();
const userRoutes = require('./userRoutes');
const accountRoutes = require('./accountRoutes');
const mortgageRoutes = require('./mortgageRoutes');
const carRoutes = require('./carRoutes')

router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);
router.use('/mortgages', mortgageRoutes);
router.use('/cars', carRoutes);

module.exports = router;
