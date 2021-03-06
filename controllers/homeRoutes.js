const router = require('express').Router();
const { User, Card, Mortgage, Car, Loan, Bank } = require('../models');
const withAuth = require('../utils/auth');

// Get all cards
router.get('/', async (req, res) => {
  try {
    if (req.session.user_id){
      const bankData = await Bank.findAll({
        where: {
          user_id: req.session.user_id,
        },
        order: [['balance', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const banks = bankData.map((bank) => bank.get({ plain: true }));
  
      let totalBankBalance = 0;
      for (let i = 0; i < banks.length; i++) {
        totalBankBalance += parseFloat(banks[i].balance);
      }
      totalBankBalance = totalBankBalance.toFixed(2);
  
      const mortgageData = await Mortgage.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['balance', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const mortgages = mortgageData.map((mortgage) => mortgage.get({ plain: true }));

    let totalMortgageAmount = 0;
    let totalMortgageAverageInterest = 0;
    let totalMortgageAverageYears = 0;
    let totalMortgagePayments = 0;
    let totalMortgageBalance = 0;
    let totalPercentMortgageRemaining = 0;
    for (let i = 0; i < mortgages.length; i++) {
      totalMortgageAmount += parseFloat(mortgages[i].loan_amount);
      totalMortgageAverageInterest += parseFloat(mortgages[i].annual_interest_rate);
      totalMortgageAverageYears += parseFloat(mortgages[i].years);
      totalMortgagePayments += parseFloat(mortgages[i].payment);
      totalMortgageBalance += parseFloat(mortgages[i].balance);
      totalPercentMortgageRemaining += parseFloat(mortgages[i].remaining);
    }
    totalMortgageAmount = totalMortgageAmount.toFixed(2);
    totalMortgageAverageInterest = (totalMortgageAverageInterest / mortgages.length).toFixed(2);
    totalMortgageAverageYears = (totalMortgageAverageYears / mortgages.length).toFixed(2);
    totalMortgagePayments = totalMortgagePayments.toFixed(2);
    totalMortgageBalance = totalMortgageBalance.toFixed(2);
    totalPercentMortgageRemaining = (totalPercentMortgageRemaining / mortgages.length).toFixed(2);

    const carData = await Car.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['balance', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const cars = carData.map((car) => car.get({ plain: true }));

    let totalCarAmount = 0;
    let totalCarAverageInterest = 0;
    let totalCarAverageMonths = 0;
    let totalCarPayments = 0;
    let totalCarBalance = 0;
    let totalPercentCarRemaining = 0;
    for (let i = 0; i < cars.length; i++) {
      totalCarAmount += parseFloat(cars[i].loan_amount);
      totalCarAverageInterest += parseFloat(cars[i].annual_interest_rate);
      totalCarAverageMonths += parseFloat(cars[i].months);
      totalCarPayments += parseFloat(cars[i].payment);
      totalCarBalance += parseFloat(cars[i].balance);
      totalPercentCarRemaining += parseFloat(cars[i].remaining);
    }
    totalCarAmount = totalCarAmount.toFixed(2);
    totalCarAverageInterest = (totalCarAverageInterest / cars.length).toFixed(2);
    totalCarAverageMonths = (totalCarAverageMonths / cars.length).toFixed(2);
    totalCarPayments = totalCarPayments.toFixed(2);
    totalCarBalance = totalCarBalance.toFixed(2);
    totalPercentCarRemaining = (totalPercentCarRemaining / cars.length).toFixed(2);

    const loanData = await Loan.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['balance', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const loans = loanData.map((loan) => loan.get({ plain: true }));

    let totalLoanAmount = 0;
    let totalLoanAverageInterest = 0;
    let totalLoanAverageMonths = 0;
    let totalLoanPayments = 0;
    let totalLoanBalance = 0;
    let totalPercentLoanRemaining = 0;
    for (let i = 0; i < loans.length; i++) {
      totalLoanAmount += parseFloat(loans[i].loan_amount);
      totalLoanAverageInterest += parseFloat(loans[i].annual_interest_rate);
      totalLoanAverageMonths += parseFloat(loans[i].months);
      totalLoanPayments += parseFloat(loans[i].payment);
      totalLoanBalance += parseFloat(loans[i].balance);
      totalPercentLoanRemaining += parseFloat(loans[i].remaining);
    }
    totalLoanAmount = totalLoanAmount.toFixed(2);
    totalLoanAverageInterest = (totalLoanAverageInterest / loans.length).toFixed(2);
    totalLoanAverageMonths = (totalLoanAverageMonths / loans.length).toFixed(2);
    totalLoanPayments = totalLoanPayments.toFixed(2);
    totalLoanBalance = totalLoanBalance.toFixed(2);
    totalPercentLoanRemaining = (totalPercentLoanRemaining / loans.length).toFixed(2);

    const cardData = await Card.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['balance', 'ASC'], ['limit', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const cards = cardData.map((card) => card.get({ plain: true }));

    let totalLimit = 0;
    let totalBalance = 0;
    let totalAvailable = 0;
    let totalUsed = 0;
    for (let i = 0; i < cards.length; i++) {
      totalLimit += parseFloat(cards[i].limit);
      totalBalance += parseFloat(cards[i].balance);
      totalAvailable += parseFloat(cards[i].available);
    }
    totalLimit = totalLimit.toFixed(2);
    totalBalance = totalBalance.toFixed(2);
    totalAvailable = totalAvailable.toFixed(2);
    totalUsed = ((totalBalance / totalLimit) * 100).toFixed(2);

    res.render('homepage', { 
      banks,
      mortgages,
      cars,
      loans,
      cards,
      totalBankBalance,
      totalMortgageAmount,
      totalMortgageAverageInterest,
      totalMortgageAverageYears,
      totalMortgagePayments,
      totalMortgageBalance,
      totalPercentMortgageRemaining,
      totalCarAmount,
      totalCarAverageInterest,
      totalCarAverageMonths,
      totalCarPayments,
      totalCarBalance,
      totalPercentCarRemaining,
      totalLoanAmount,
      totalLoanAverageInterest,
      totalLoanAverageMonths,
      totalLoanPayments,
      totalLoanBalance,
      totalPercentLoanRemaining,
      totalLimit,
      totalBalance,
      totalAvailable,
      totalUsed,
      logged_in: req.session.logged_in
    });
    } else {
      res.render('homepage');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Get bank account by id
router.get('/bank/:id', async (req, res) => {
  try {
    const bankData = await Bank.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!bankData) {
      res.render('404');
      return;
    }

    const bank = bankData.get({ plain: true });

    res.render('bank', {
      ...bank,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get mortgage by id
router.get('/mortgage/:id', async (req, res) => {
  try {
    const mortgageData = await Mortgage.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!mortgageData) {
      res.render('404');
      return;
    }

    const mortgage = mortgageData.get({ plain: true });

    res.render('mortgage', {
      ...mortgage,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get car loan by id
router.get('/car/:id', async (req, res) => {
  try {
    const carData = await Car.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!carData) {
      res.render('404');
      return;
    }

    const car = carData.get({ plain: true });

    res.render('car', {
      ...car,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get miscellaneous loan by id
router.get('/loan/:id', async (req, res) => {
  try {
    const loanData = await Loan.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!loanData) {
      res.render('404');
      return;
    }

    const loan = loanData.get({ plain: true });

    res.render('loan', {
      ...loan,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get card by id
router.get('/card/:id', async (req, res) => {
  try {
    const cardData = await Card.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!cardData) {
      res.render('404');
      return;
    }

    const card = cardData.get({ plain: true });

    res.render('card', {
      ...card,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get bank accounts page by user_id
router.get('/banks', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bank }],
      order: [
        [Bank, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('banks', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get mortgage page by user_id
router.get('/mortgages', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Mortgage }],
      order: [
        [Mortgage, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('mortgages', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get car loan page by user_id
router.get('/cars', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Car }],
      order: [
        [Car, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('cars', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get miscellaneous loan page by user_id
router.get('/loans', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Loan }],
      order: [
        [Loan, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('loans', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get cards page by user id
router.get('/cards', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Card }],
      order: [
        [Card, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('cards', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log in if not already logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Sign up if not already logged in
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
})

// New bank account creation page
router.get('/add-bank', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-bank', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New mortgage creation page
router.get('/add-mortgage', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-mortgage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New car loan creation page
router.get('/add-car', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-car', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New miscellaneous loan creation page
router.get('/add-loan', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-loan', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New card creation page
router.get('/add-card', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-card', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit bank account page
router.get('/edit-bank/:id', async (req, res) => {
  try {
    const editBankData = await Bank.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'balance'
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (!editBankData) {
      res.render('404');
      return;
    }

    const bank = editBankData.get({ plain: true });

    res.render('edit-bank', {
      ...bank,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit mortgage page
router.get('/edit-mortgage/:id', async (req, res) => {
  try {
    const editMortgageData = await Mortgage.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'loan_amount',
        'annual_interest_rate',
        'years',
        'balance',
        'remaining'
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (!editMortgageData) {
      res.render('404');
      return;
    }

    const mortgage = editMortgageData.get({ plain: true });

    res.render('edit-mortgage', {
      ...mortgage,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit car loan page
router.get('/edit-car/:id', async (req, res) => {
  try {
    const editCarData = await Car.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'loan_amount',
        'annual_interest_rate',
        'months',
        'balance',
        'remaining'
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (!editCarData) {
      res.render('404');
      return;
    }

    const car = editCarData.get({ plain: true });

    res.render('edit-car', {
      ...car,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit card page
router.get('/edit-card/:id', async (req, res) => {
  try {
    const editCardData = await Card.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'limit',
        'balance'
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (!editCardData) {
      res.render('404');
      return;
    }

    const card = editCardData.get({ plain: true });

    res.render('edit-card', {
      ...card,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit miscellaneous loan page
router.get('/edit-loan/:id', async (req, res) => {
  try {
    const editLoanData = await Loan.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'loan_amount',
        'annual_interest_rate',
        'months',
        'balance',
        'remaining'
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (!editLoanData) {
      res.render('404');
      return;
    }

    const loan = editLoanData.get({ plain: true });

    res.render('edit-loan', {
      ...loan,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;