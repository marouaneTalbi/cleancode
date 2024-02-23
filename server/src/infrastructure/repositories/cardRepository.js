const Card = require('../../domain/models/cardModel');

class CardRepository {

  async saveCard(card) {
    try {
      return await card.save();
    } catch(error) {
      throw new Error(error);
    }
  }

  async getAllCards() {
    try {
      return await Card.findAll();
    } catch(error) {
      throw new Error(error);
    }
  }

  async getCardById(id) {
    try {
      return await Card.findByPk(id);
    } catch(error) {
      throw new Error(error);
    }
  }

  async createCard(card) {
    try {
      return await Card.create(card);
    } catch(error) {
      throw new Error(error);
    }
  }

  async getCardsBy(column, value) {
    try {
      return await Card.findAll({
        where: {
          [column]: value
        }
      })
    } catch(error) {
      throw new Error(error);
    }
  }
}

module.exports = CardRepository;