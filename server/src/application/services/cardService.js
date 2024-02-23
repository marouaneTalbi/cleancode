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
        
        let learning = await this.learningRepository.getLearningBy('cardId', cardId);
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
        learning.date = new Date().toISOString().slice(0, 10);
        await this.learningRepository.saveLearning(learning);
        await this.cardRepository.saveCard(card);

    } catch(error) {
        throw new Error(error);
    }
  }

  async getCardsQuizz(date) {
    try {
        if(!date) {
            date = new Date();
        }
        const currentDate = new Date(date);

        // Because the date is in UTC, we need to add 1 day to the date
        // J'ai pas réussi à mettre le même timezone que la base de données
        currentDate.setDate(currentDate.getDate() + 1);
        date = currentDate.toISOString().slice(0, 10);

        const learnings = await this.learningRepository.getLearningsBy('date', date);

        const cards = [];
        for (const learning of learnings) {
            const category = this.getCategoryForDate(learning.date);
            const card = await this.cardRepository.getCardById(learning.cardId);

            if(category === card.category) {
                cards.push(card);
            }
        }

        return cards;
    } catch(error) {
        throw new Error(error);
    }
  }

  
  getCategoryForDate(learningDate) {
    const currentDate = new Date();

    const diffInDays = Math.floor((currentDate - new Date(learningDate))) / (1000 * 60 * 60 * 24);

    if (diffInDays < 1) {
        return "FIRST";
    } else if (diffInDays < 2) {
        return "SECOND";
    } else if (diffInDays < 4) {
        return "THIRD";
    } else if (diffInDays < 8) {
        return "FOURTH";
    } else if (diffInDays < 16) {
        return "FIFTH";
    } else if (diffInDays < 32) {
        return "SIXTH";
    } else {
        return "SEVENTH";
    }
}

}

module.exports = CardApplicationService;
