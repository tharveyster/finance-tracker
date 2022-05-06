const router = require('express').Router();
const { Loan } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new miscellaneous loan
router.post('/', withAuth, async (req, res) => {
  try {
    const newLoan = await Loan.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newLoan);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing miscellaneous loan by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const loanData = await Loan.update({
      title: req.body.title,
      loan_amount: req.body.loan_amount,
      annual_interest_rate: req.body.annual_interest_rate,
      months: req.body.months,
      payment: req.body.payment,
      balance: req.body.balance,
      remaining: req.body.remaining},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!loanData) {
      res.render('404');
      return;
    }

    res.status(200).json(loanData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing miscellaneous loan by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const loanData = await Loan.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!loanData) {
      res.render('404');
      return;
    }

    res.status(200).json(loanData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;