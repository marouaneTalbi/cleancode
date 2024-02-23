import axios from 'axios';

const baseURL = 'http://localhost:4000/cards';

export const getAllCards = async () => {
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
  console.log(cardResponses);
  try {
    await axios.patch(`${baseURL}/${cardId}/answer`, { isValid });
  } catch (error) {
    console.error('Erreur lors de la validation de la réponse :', error);
  }
}

export const handleForceAnswer = async (event, cardId) => {
  event.preventDefault();
  try {
    await axios.patch(`${baseURL}/${cardId}/answer`, { isValid: true });
  } catch (error) {
    console.error('Erreur lors de la validation de la réponse :', error);
  }
}

export const getCardsQuizz = async (date) => {
  try {
    if (!date) {
      date = new Date();
    }
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    date = currentDate.toISOString().slice(0, 10);

    const response = await axios.get(`${baseURL}/quizz?date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes pour le quiz :', error);
  }
}
