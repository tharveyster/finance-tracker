const router = require('express').Router();
const { Account } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new account
router.post('/', withAuth, async (req, res) => {
  try {
    const newAccount = await Account.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAccount);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing account by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const accountData = await Account.update({
      title: req.body.title,
      limit: req.body.limit,
      balance: req.body.balance,
      available: req.body.limit - req.body.balance,
      used: (req.body.balance / req.body.limit) * 100},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!accountData) {
      res.render('404');
      return;
    }

    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing account by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const accountData = await Account.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!accountData) {
      res.render('404');
      return;
    }

    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;