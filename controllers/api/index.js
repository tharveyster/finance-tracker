const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const mortgageRoutes = require('./mortgageRoutes');
const carRoutes = require('./carRoutes');
const loanRoutes = require('./loanRoutes');
const accountRoutes = require('./accountRoutes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/mortgages', mortgageRoutes);
router.use('/cars', carRoutes);
router.use('/loans', loanRoutes);
router.use('/accounts', accountRoutes);

module.exports = router;
