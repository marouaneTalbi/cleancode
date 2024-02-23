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
        learning.date = new Date().toISOString().slice(0, 10);;
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
        const cards = await this.cardRepository.getAllCards();

        const revisableCards = [];
        for (const learning of learnings) {
            const card = cards.find(card => card.id === learning.cardId);
            card.lastRevisionDate = learning.date;
            revisableCards.push(card);
        }

        const filteredCards = await this.filterQuestionsToReview(revisableCards);
        return filteredCards;
    } catch(error) {
        throw new Error(error);
    }
  }

  
  

  async calculateCurrentCategory(daysSinceLastRevision){
  let currentCategory = 1;
  let daysUntilNextRevision = 1;
  while (currentCategory < 7) {
    daysUntilNextRevision *= (currentCategory === 1 ? 1 : 2);
    if (daysSinceLastRevision >= daysUntilNextRevision) {
      currentCategory++;
    } else {
      break;
    }
  }
  return currentCategory;
};

  async getLearningDateByCardId(cardId) {
    try {
      return await this.learningRepository.getLearningDateByCardId(cardId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CardApplicationService;
