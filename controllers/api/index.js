const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const mortgageRoutes = require('./mortgageRoutes');
const carRoutes = require('./carRoutes');
const loanRoutes = require('./loanRoutes');
const bankRoutes = require('./bankRoutes');
const retirementRoutes = require('./401kRoutes');
const iraRoutes = require('./iraRoutes');
const cdRoutes = require('./cdRoutes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/mortgages', mortgageRoutes);
router.use('/cars', carRoutes);
router.use('/loans', loanRoutes);
router.use('/banks', bankRoutes);
router.use('/401ks', retirementRoutes);
router.use('/iras', iraRoutes);
router.use('/cds', cdRoutes);

module.exports = router;
