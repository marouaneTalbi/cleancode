const CardRepository = require('../../infrastructure/repositories/cardRepository');

class CardService {
  constructor() {
    this.cardRepository = new CardRepository();
  }

  async getAllCards() {
    try {
      return await this.cardRepository.getAllCards();
    } catch(error) {
      throw new Error(error);
    }
  }

  async createCard(card) {
    try {
      return await this.cardRepository.createCard(card);
    } catch(error) {
      throw new Error(error);
    }
  }

  async getCardsByDate(date) {
    // try {
    //   if(!date) {

    //   } else {
    //     return await this.cardRepository.getCardsBy('date', date);
    //   }
    // }
  }
}

module.exports = CardService;
