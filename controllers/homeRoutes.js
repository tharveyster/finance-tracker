const router = require('express').Router();
const { User, Card, Mortgage, Car, Loan, Bank, Retirement, Ira, Cd, Brokerage } = require('../models');
const withAuth = require('../utils/auth');

// Get all types of accounts
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
      order: [['balance', 'DESC'], ['limit', 'DESC']],
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

    const retirementData = await Retirement.findAll({
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

    const retirements = retirementData.map((retirement) => retirement.get({ plain: true }));

    let total401kBalance = 0;
    for (let i = 0; i < retirements.length; i++) {
      total401kBalance += parseFloat(retirements[i].balance);
    }
    total401kBalance = total401kBalance.toFixed(2);

    const iraData = await Ira.findAll({
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

    const iras = iraData.map((ira) => ira.get({ plain: true }));

    let totalIraBalance = 0;
    for (let i = 0; i < iras.length; i++) {
      totalIraBalance += parseFloat(iras[i].balance);
    }
    totalIraBalance = totalIraBalance.toFixed(2);

    const cdData = await Cd.findAll({
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

    const cds = cdData.map((cd) => cd.get({ plain: true }));

    let totalCdBalance = 0;
    for (let i = 0; i < cds.length; i++) {
      totalCdBalance += parseFloat(cds[i].balance);
    }
    totalCdBalance = totalCdBalance.toFixed(2);

    const brokerageData = await Brokerage.findAll({
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

    const brokerages = brokerageData.map((brokerage) => brokerage.get({ plain: true }));

    let totalBrokerageBalance = 0;
    for (let i = 0; i < brokerages.length; i++) {
      totalBrokerageBalance += parseFloat(brokerages[i].balance);
    }
    totalBrokerageBalance = totalBrokerageBalance.toFixed(2);

    totalAssets = parseFloat(totalBankBalance) + parseFloat(total401kBalance) + parseFloat(totalIraBalance) + parseFloat(totalCdBalance) + parseFloat(totalBrokerageBalance);
    totalAssets = totalAssets.toFixed(2);

    totalDebt = parseFloat(totalMortgageBalance) + parseFloat(totalCarBalance) + parseFloat(totalLoanBalance) + parseFloat(totalBalance);
    totalDebt = totalDebt.toFixed(2);

    netWorth = totalAssets - totalDebt;
    netWorth = netWorth.toFixed(2);

    res.render('homepage', { 
      banks,
      mortgages,
      cars,
      loans,
      cards,
      retirements,
      iras,
      cds,
      brokerages,
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
      total401kBalance,
      totalIraBalance,
      totalCdBalance,
      totalBrokerageBalance,
      totalAssets,
      totalDebt,
      netWorth,
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

// Get 401K account by id
router.get('/401k/:id', async (req, res) => {
  try {
    const retirementData = await Retirement.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!retirementData) {
      res.render('404');
      return;
    }

    const retirement = retirementData.get({ plain: true });

    res.render('401k', {
      ...retirement,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get IRA account by id
router.get('/ira/:id', async (req, res) => {
  try {
    const iraData = await Ira.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!iraData) {
      res.render('404');
      return;
    }

    const ira = iraData.get({ plain: true });

    res.render('ira', {
      ...ira,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get CD account by id
router.get('/cd/:id', async (req, res) => {
  try {
    const cdData = await Cd.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!cdData) {
      res.render('404');
      return;
    }

    const cd = cdData.get({ plain: true });

    res.render('cd', {
      ...cd,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Getbrokerage account by id
router.get('/brokerage/:id', async (req, res) => {
  try {
    const brokerageData = await Brokerage.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!brokerageData) {
      res.render('404');
      return;
    }

    const brokerage = brokerageData.get({ plain: true });

    res.render('brokerage', {
      ...brokerage,
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

// Get 401k accounts page by user_id
router.get('/401ks', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Retirement }],
      order: [
        [Retirement, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('401ks', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get IRA accounts page by user_id
router.get('/iras', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Ira }],
      order: [
        [Ira, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('iras', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get CD accounts page by user_id
router.get('/cds', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Cd }],
      order: [
        [Cd, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('cds', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get brokerage accounts page by user_id
router.get('/brokerages', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Brokerage }],
      order: [
        [Brokerage, 'title', 'ASC']
      ],
    });

    const user = userData.get({ plain: true });

    res.render('brokerages', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
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

// New 401k account creation page
router.get('/add-401k', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-401k', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New IRA account creation page
router.get('/add-ira', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-ira', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New CD account creation page
router.get('/add-cd', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-cd', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// New brokerage account creation page
router.get('/add-brokerage', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('add-brokerage', {
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

// Edit 401k account page
router.get('/edit-401k/:id', async (req, res) => {
  try {
    const edit401kData = await Retirement.findByPk(req.params.id, {
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

    if (!edit401kData) {
      res.render('404');
      return;
    }

    const retirement = edit401kData.get({ plain: true });

    res.render('edit-401k', {
      ...retirement,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit IRA account page
router.get('/edit-ira/:id', async (req, res) => {
  try {
    const editIraData = await Ira.findByPk(req.params.id, {
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

    if (!editIraData) {
      res.render('404');
      return;
    }

    const ira = editIraData.get({ plain: true });

    res.render('edit-ira', {
      ...ira,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit CD account page
router.get('/edit-cd/:id', async (req, res) => {
  try {
    const editCdData = await Cd.findByPk(req.params.id, {
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

    if (!editCdData) {
      res.render('404');
      return;
    }

    const cd = editCdData.get({ plain: true });

    res.render('edit-cd', {
      ...cd,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit brokerage account page
router.get('/edit-brokerage/:id', async (req, res) => {
  try {
    const editBrokerageData = await Brokerage.findByPk(req.params.id, {
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

    if (!editBrokerageData) {
      res.render('404');
      return;
    }

    const brokerage = editBrokerageData.get({ plain: true });

    res.render('edit-brokerage', {
      ...brokerage,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;