const CardService = require('../../domain/services/cardService');
const CardApplicationService = require('../../application/services/cardService');

const cardService = new CardService();
const cardApplicationService = new CardApplicationService();

exports.getCards = async (req, res) => {
    try {
        const cards = await cardService.getCards();
        return res.status(200).json(cards);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.createCard = async (req, res) => {
    try {
        const card = await cardService.createCard(req.body);
        return res.status(201).json(card);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getCardsQuizz = async (req, res) => {
    try {
        const cards = await cardApplicationService.getCardsQuizz(req.query.date);
        return res.status(200).json(cards);
    } catch(error) {
        return res.status(500).json({message: error.message})
    }
}

exports.answerCardQuestion = async (req, res) => {
    try {
        const test = await cardApplicationService.answerCardQuestion(req.params.cardId, req.body.isValid);
        return res.status(200).json(test);
    } catch(error) {
        return res.status(500).json({message: error.message})
    }
}