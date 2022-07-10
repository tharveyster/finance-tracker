const router = require('express').Router();
const { Bank } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new bank account
router.post('/', withAuth, async (req, res) => {
  try {
    const newBank = await Bank.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBank);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing bank account by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const bankData = await Bank.update({
      title: req.body.title,
      balance: req.body.balance},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!bankData) {
      res.render('404');
      return;
    }

    res.status(200).json(bankData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing bank account by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bankData = await Bank.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bankData) {
      res.render('404');
      return;
    }

    res.status(200).json(bankData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;