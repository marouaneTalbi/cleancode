const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);
router.get('/cards/quizz', cardController.getCardsQuizz);
router.patch('/cards/:cardId/answer', cardController.answerCardQuestion);

module.exports = router;