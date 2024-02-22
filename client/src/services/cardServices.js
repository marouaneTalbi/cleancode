import axios from 'axios';

const baseURL = 'http://localhost:4000/cards';

export const getCards = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes mémoire :', error);
  }
}

export const createCard = async (formData) => {
  try {
    const response = await axios.post(baseURL, formData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la carte mémoire :', error);
  }
}

export const answerCardQuestion = async (cardId, cardResponses, cards) => {
  let isValid = cardResponses[cardId] === cards.find(card => card.id === cardId).answer;
  try {
    await axios.patch(`${baseURL}/${cardId}/answer`, { isValid });
  } catch (error) {
    console.error('Erreur lors de la validation de la réponse :', error);
  }
}

export const handleForceAnswer = async (cardId) => {
  try {
    await axios.patch(`${baseURL}/${cardId}/answer`, { isValid: true });
  } catch (error) {
    console.error('Erreur lors de la validation de la réponse :', error);
  }
}
