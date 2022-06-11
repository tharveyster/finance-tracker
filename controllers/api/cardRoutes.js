const router = require('express').Router();
const { Card } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new card
router.post('/', withAuth, async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update existing card by id route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.update({
      title: req.body.title,
      limit: req.body.limit,
      balance: req.body.balance,
      available: req.body.available,
      used: req.body.used},
      {
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!cardData) {
      res.render('404');
      return;
    }

    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete existing card by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!cardData) {
      res.render('404');
      return;
    }

    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;