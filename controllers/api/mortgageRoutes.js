const router = require('express').Router();
const { Mortgage } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new mortgage
router.post('/', withAuth, async (req, res) => {
  try {
    const newMortgage = await Mortgage.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMortgage);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing mortgage by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const mortgageData = await Mortgage.update({
      title: req.body.title,
      loan_amount: req.body.loan_amount,
      annual_interest_rate: req.body.annual_interest_rate,
      years: req.body.years,
      payment: (req.body.loan_amount * (req.body.annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (req.body.annual_interest_rate / 1200)) , (12 * req.body.years) * -1))),
      balance: req.body.balance,
      remaining: ((req.body.balance / req.body.loan_amount) * 100)},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!mortgageData) {
      res.render('404');
      return;
    }

    res.status(200).json(mortgageData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing mortgage by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const mortgageData = await Mortgage.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!mortgageData) {
      res.render('404');
      return;
    }

    res.status(200).json(mortgageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;