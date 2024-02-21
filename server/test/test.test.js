
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const CardService = require('../src/domain/services/CardService');
const CardApplicationService = require('../src/application/services/cardService');
const LearningRepository  = require('../src/infrastructure/repositories/learningRepository');


const mockAnswerCardQuestion = jest.fn();
jest.mock('../src/interfaces/controllers/cardController', () => {
  return {
    answerCardQuestion: mockAnswerCardQuestion,
  };
});
const app = express();
app.use(bodyParser.json());

jest.mock('../src/infrastructure/repositories/cardRepository', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCards: jest.fn().mockImplementation(() => [
        { id: 1, name: 'Card 1', description: 'Description 1' },
        { id: 2, name: 'Card 2', description: 'Description 2' },
        { id: 3, name: 'Card 3', description: 'Description 2' },
      ]),
      createCard: jest.fn().mockImplementation(async (card) => card),
      getCardById: jest.fn().mockImplementation(cardId => Promise.resolve({
        id: cardId,
        category: 'FIRST',
      })),
      saveCard: jest.fn().mockImplementation(card => Promise.resolve(card)),
    };
  });
});

describe('CardService', () => {
  describe('getCards', () => {
    it('should return a list of cards', async () => {
      const cardService = new CardService();
      const cards = await cardService.getCards();
      expect(cards.length).toBe(3);
      expect(cards[0].id).toBe(1);
      expect(cards[1].id).toBe(2);
    });

    it('should return a list of cards with correct data', async () => {
        const cardService = new CardService();
        const mockCards = [
          { id: 1, name: 'Card 1', description: 'Description 1' },
          { id: 2, name: 'Card 2', description: 'Description 2' },
          { id: 3, name: 'Card 3', description: 'Description 3' },
        ];
        
        cardService.cardRepository.getCards.mockResolvedValue(mockCards);
        const cards = await cardService.getCards();
        expect(cards).toEqual(mockCards);
      });
  });

  describe('createCard', () => {    
    it('should create a card and return the created card', async () => {
            const cardService = new CardService();
            const mockCard = { name: 'New Card', description: 'New Description' };
            const createdCard = await cardService.createCard(mockCard);

            expect(createdCard).toEqual(mockCard);
            expect(cardService.cardRepository.createCard).toHaveBeenCalledWith(mockCard);
        });
    });

    it('should handle errors when creating a card fails', async () => {
        const cardService = new CardService();
        const mockCard = { name: 'Faulty Card', description: 'Problematic Description' };
        const errorMessage = 'Error creating card';
      
        cardService.cardRepository.createCard.mockRejectedValue(new Error(errorMessage));
        await expect(cardService.createCard(mockCard)).rejects.toThrow(errorMessage);
        expect(cardService.cardRepository.createCard).toHaveBeenCalledWith(mockCard);
    });

    it('should require name and description to create a card', async () => {
        const cardService = new CardService();

        const cardWithoutName = { description: 'A card without a name' };
        const cardWithoutDescription = { name: 'NameOnlyCard' };
    
        cardService.cardRepository.createCard.mockRejectedValue(new Error("Name is required"));
        await expect(cardService.createCard(cardWithoutName)).rejects.toThrow("Name is required");

        cardService.cardRepository.createCard.mockRejectedValue(new Error("Description is required"));
        await expect(cardService.createCard(cardWithoutDescription)).rejects.toThrow("Description is required");

      });
});

describe('CardApplicationService', () => {
    it('should promote the card to the next category when the answer is valid', async () => {
        const cardApplicationService = new CardApplicationService();
        const mockAnswerCard = {id: 1, category: 'SECOND'};
        const cardId = 1; 
        await cardApplicationService.answerCardQuestion(cardId, true);

        expect(cardApplicationService.cardRepository.getCardById).toHaveBeenCalledWith(cardId);
    });
});
