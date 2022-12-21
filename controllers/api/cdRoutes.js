const router = require('express').Router();
const { Cd } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new CD account
router.post('/', withAuth, async (req, res) => {
  try {
    const newCd = await Cd.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCd);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing CD account by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const cdData = await Cd.update({
      title: req.body.title,
      balance: req.body.balance},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!cdData) {
      res.render('404');
      return;
    }

    res.status(200).json(cdData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing CD account by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const cdData = await Cd.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!cdData) {
      res.render('404');
      return;
    }

    res.status(200).json(cdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;