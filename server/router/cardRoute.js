const express = require('express');
const CardController = require('../controller/cardController');
const cardRoute = express.Router();

cardRoute.post('/card', CardController.createCard)
cardRoute.get('/cards', CardController.getCards)
cardRoute.get('/cards/:id', CardController.getCardById);
cardRoute.delete('/cards/:id', CardController.deleteCard);
cardRoute.put('/cards/:id', CardController.updateCard);
cardRoute.patch('/cards/:id', CardController.updateCard); 


module.exports = cardRoute;