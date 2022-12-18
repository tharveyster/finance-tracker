const router = require('express').Router();
const { Retirement } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new 401k account
router.post('/', withAuth, async (req, res) => {
  try {
    const new401k = await Retirement.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(new401k);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing 401k account by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const retirementData = await Retirement.update({
      title: req.body.title,
      balance: req.body.balance},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!retirementData) {
      res.render('404');
      return;
    }

    res.status(200).json(retirementData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing 401k account by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const retirementData = await Retirement.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!retirementData) {
      res.render('404');
      return;
    }

    res.status(200).json(retirementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;