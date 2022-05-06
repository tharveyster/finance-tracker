const router = require('express').Router();
const { Car } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new car loan
router.post('/', withAuth, async (req, res) => {
  try {
    const newCar = await Car.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCar);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing car loan by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const carData = await Car.update({
      title: req.body.title,
      loan_amount: req.body.loan_amount,
      annual_interest_rate: req.body.annual_interest_rate,
      months: req.body.months,
      payment: (req.body.loan_amount * (req.body.annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (req.body.annual_interest_rate / 1200)) , req.body.months * -1))),
      balance: req.body.balance,
      remaining: ((req.body.balance / req.body.loan_amount) * 100)},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!carData) {
      res.render('404');
      return;
    }

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing car loan by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const carData = await Car.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!carData) {
      res.render('404');
      return;
    }

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;