const CardRepository = require('../../infrastructure/repositories/cardRepository');
const LearningRepository = require('../../infrastructure/repositories/learningRepository');

const CATEGORY_VALUES = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];

class CardApplicationService {

  constructor() {
    this.cardRepository = new CardRepository();
    this.learningRepository = new LearningRepository();
  }

  async answerCardQuestion(cardId, isValid) {
    try {
        const card = await this.cardRepository.getCardById(cardId);
        
        let learning = await this.learningRepository.getLearningByCardId(cardId);
        if(!learning) {
            learning = await this.learningRepository.createLearning({cardId: cardId, isValid: isValid, date: new Date()})
        }

        if(isValid) {
            if(card.category === "SEVENTH") {
                card.category = "DONE";
            } else {
                card.category = CATEGORY_VALUES[CATEGORY_VALUES.indexOf(card.category) + 1];
            }
        } else {
            card.category = "FIRST";
        }

        learning.isValid = isValid;
        learning.date = new Date();
        await this.learningRepository.saveLearning(learning);
        await this.cardRepository.saveCard(card);

    } catch(error) {
        throw new Error(error);
    }
  }
}

module.exports = CardApplicationService;
