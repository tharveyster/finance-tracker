const router = require('express').Router();
const { User, Account } = require('../models');
const withAuth = require('../utils/auth');

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accountData = await Account.findAll({
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
      accounts,
      totalLimit,
      totalBalance,
      totalAvailable,
      totalUsed,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

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

    res.render('account', {
      ...account,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get accounts page by user id
router.get('/accounts', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Account }],
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

// New account creation page
router.get('/add-account', (req, res) => {
  res.render('add-account');
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

module.exports = router;