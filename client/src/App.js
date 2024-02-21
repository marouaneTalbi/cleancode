'use client';
import './App.css';
import { useState } from 'react';
import { Button, Modal, Label, TextInput, Card } from 'flowbite-react';
import axios from 'axios';

function App() {

  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [cardResponses, setCardResponses] = useState({});
  const [answeredCards, setAnsweredCards] = useState({});
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    tag: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const getCards = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes mémoire :', error);
    }
  }

  const createCard = async () => {
    try {
      const response = await axios.post('http://localhost:4000/cards', formData);
    } catch (error) {
      console.error('Erreur lors de la création de la carte mémoire :', error);
    }
  }

  const answserCardQuestion = async (cardId) => {
    let isValid;
    if(cardResponses[cardId] === cards.find(card => card.id === cardId).answer) {
      isValid = true;
    } else {
      isValid = false;
    }
    try {
      await axios.patch(`http://localhost:4000/cards/${cardId}/answer`, { isValid });
    } catch (error) {
      console.error('Erreur lors de la validation de la réponse :', error);
    }
  }

  const handleQuiz = () => {
    getCards();
    setStartQuiz(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard();

    setFormData({
      question: '',
      answer: '',
      tag: '',
    });
    setOpenModal(false);
  };

  const handleForceAnswer = async(event, cardId) => {
    event.preventDefault();
    await axios.patch(`http://localhost:4000/cards/${cardId}/answer`, { isValid: true });
  }

  const handleAnswer = (event, cardId) => {
    event.preventDefault();
    answserCardQuestion(cardId);

    setAnsweredCards((prevAnsweredCards) => ({
      ...prevAnsweredCards,
      [cardId]: true
    }));
  }

  const handleChangeAnswer = (event, question) => {
    event.preventDefault();
    const { value } = event.target;
    setCardResponses((prevResponses) => ({
      ...prevResponses,
      [question]: value
    }));
  }; 
  
  return (
    <div className="p-4">
      <div className='flex flex-row gap-6'>
        <Button onClick={() => setOpenModal(true)}>Créer une carte mémoire</Button>
        <Button color='gray' onClick={() => handleQuiz()}>Commencer un questionnaire</Button>
      </div>
      <div className='flex flex-row gap-6 mt-6'>
        {
          startQuiz && cards.map((card, index) => (
            <Card className="max-w-sm" key={card.id}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.question}
              </h5>
              <form onSubmit={(event) => handleAnswer(event, card.id)}>
                <TextInput
                  id={`answer-${card.question}`}
                  type="text"
                  placeholder="Votre réponse"
                  value={cardResponses[card.question] || ''}
                  onChange={(event) => handleChangeAnswer(event, card.question)}
                  required
                  color={answeredCards[card.id] ? (cardResponses[card.question] === card.answer ? 'success' : 'failure') : 'gray'}
                  helperText={
                    answeredCards[card.id] ? (
                      cardResponses[card.question] === card.answer ? (
                        <>
                          <span className="font-medium">Correct!</span> Réponse : {card.answer}
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Incorrect!</span> Réponse : {card.answer}
                        </>
                      )
                    ) : null
                  }
                />
                <div className='flex flex-row justify-between'>
                  <Button className='mt-4' type='submit'>Répondre</Button>
                  {
                    answeredCards[card.id] && (cardResponses[card.question] !== card.answer) ? (
                      <Button onClick={(event) => handleForceAnswer(event, card.id)} className='mt-4' color='gray'>Forcer la réponse</Button>
                    ) : null
                  }
                </div>
              </form>
            </Card>
          ))
        }
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Créer une carte mémoire</Modal.Header>
        <Modal.Body>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="question" value="Question*" />
              </div>
              <TextInput id="question" type="text" placeholder="Votre question" value={formData.question} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="answer" value="Réponse*" />
              </div>
              <TextInput id="answer" type="text" placeholder="Votre réponse" value={formData.answer} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tag" value="Tag" />
              </div>
              <TextInput id="tag" type="text" placeholder="Votre tag" value={formData.tag} onChange={handleChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categorie" value="Catégorie" />
              </div>
              <TextInput id="categorie" type="text" placeholder="1" disabled readOnly />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>Créer</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
