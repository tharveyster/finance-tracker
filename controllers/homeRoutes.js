const router = require('express').Router();
const { User, Account, Mortgage, Car, Loan } = require('../models');
const withAuth = require('../utils/auth');

// Get all accounts
router.get('/', async (req, res) => {
  try {
    if (req.session.user_id){
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

    const accountData = await Account.findAll({
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

    const accounts = accountData.map((account) => account.get({ plain: true }));

    let totalLimit = 0;
    let totalBalance = 0;
    let totalAvailable = 0;
    let totalUsed = 0;
    for (let i = 0; i < accounts.length; i++) {
      totalLimit += parseFloat(accounts[i].limit);
      totalBalance += parseFloat(accounts[i].balance);
      totalAvailable += parseFloat(accounts[i].available);
    }
    totalLimit = totalLimit.toFixed(2);
    totalBalance = totalBalance.toFixed(2);
    totalAvailable = totalAvailable.toFixed(2);
    totalUsed = ((totalBalance / totalLimit) * 100).toFixed(2);

    res.render('homepage', { 
      mortgages,
      cars,
      loans,
      accounts,
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

// Get account by id
router.get('/account/:id', async (req, res) => {
  try {
    const accountData = await Account.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!accountData) {
      res.render('404');
      return;
    }

    const account = accountData.get({ plain: true });

    res.render('creditCards', {
      ...account,
      logged_in: req.session.logged_in
    });
  } catch (err) {
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

// Get accounts page by user id
router.get('/accounts', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Account }],
      order: [
        [Account, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('accounts', {
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

// New mortgage creation page
router.get('/add-mortgage', (req, res) => {
  res.render('add-mortgage');
});

// New car loan creation page
router.get('/add-car', (req, res) => {
  res.render('add-car');
});

// New miscellaneous loan creation page
router.get('/add-loan', (req, res) => {
  res.render('add-loan');
});

// New account creation page
router.get('/add-account', (req, res) => {
  res.render('add-account');
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

// Edit account page
router.get('/edit-account/:id', async (req, res) => {
  try {
    const editAccountData = await Account.findByPk(req.params.id, {
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

    if (!editAccountData) {
      res.render('404');
      return;
    }

    const account = editAccountData.get({ plain: true });

    res.render('edit-account', {
      ...account,
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