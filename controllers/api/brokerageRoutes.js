const router = require('express').Router();
const { Brokerage } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new brokerage account
router.post('/', withAuth, async (req, res) => {
  try {
    const newBrokerage = await Brokerage.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBrokerage);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing brokerage account by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const brokerageData = await Brokerage.update({
      title: req.body.title,
      balance: req.body.balance},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!brokerageData) {
      res.render('404');
      return;
    }

    res.status(200).json(brokerageData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing brokerage account by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const brokerageData = await Brokerage.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!brokerageData) {
      res.render('404');
      return;
    }

    res.status(200).json(brokerageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;