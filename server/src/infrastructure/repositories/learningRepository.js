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

  async getLearningsBy(column, value) {
    try {
        return await Learning.findAll({
            where: {
              [column]: value
            }
        })
    } catch(error) {
        throw new Error(error);
    }
  }

  async getLearningBy(column, value) {
    try {
        return await Learning.findOne({
            where: {
              [column]: value
            }
        })
    } catch(error) {
        throw new Error(error);
    }
  }
}

module.exports = LearningRepository;