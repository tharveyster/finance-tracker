const router = require('express').Router();
const { Ira } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new IRA account
router.post('/', withAuth, async (req, res) => {
  try {
    const newIra = await Ira.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newIra);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing IRA account by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const iraData = await Ira.update({
      title: req.body.title,
      balance: req.body.balance},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!iraData) {
      res.render('404');
      return;
    }

    res.status(200).json(iraData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing IRA account by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const iraData = await Ira.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!iraData) {
      res.render('404');
      return;
    }

    res.status(200).json(iraData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;