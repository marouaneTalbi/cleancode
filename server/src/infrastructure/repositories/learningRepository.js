const Learning = require('../../domain/models/learningModel');

class LearningRepository {

  async createLearning(learning) {
    try {
        return await Learning.create(learning);
    } catch(error) {
        throw new Error(error);
    }
  }

  async saveLearning(learning) {
    try {
      return await learning.save();
    } catch(error) {
      throw new Error(error);
    }
  }

  async getLearningByCardId(cardId) {
    try {
        return await Learning.findOne({
            where: {
                cardId: cardId
            }
        })
    } catch(error) {
        throw new Error(error);
    }
  }
}

module.exports = LearningRepository;