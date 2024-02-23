'use client';
import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCardsQuizz, getAllCards, createCard, answerCardQuestion, handleForceAnswer } from './services/cardServices';
import { Button } from 'flowbite-react';
import MyModal from './components/Modal';
import MyCard from './components/Card';

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

  const handleQuiz = async()  => {
    const allQuestions = await getAllCards();
    //const testQuizz = await getCardsQuizz();
    setCards(allQuestions)
    setStartQuiz(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(formData);

    setFormData({
      question: '',
      answer: '',
      tag: '',
    });
    setOpenModal(false);
  };

  const handleAnswer = (event, cardId) => {
    event.preventDefault();
    answerCardQuestion(cardId, cardResponses, cards);
    setAnsweredCards((prevAnsweredCards) => ({
      ...prevAnsweredCards,
      [cardId]: true
    }));
  }

  const handleChangeAnswer = (event, cardId) => {
    event.preventDefault();
    const { value } = event.target;
    setCardResponses((prevResponses) => ({
      ...prevResponses,
      [cardId]: value
    }));
  }; 
  
  return (
    <div className="p-4">
      <div className='flex flex-row gap-6'>
        <Button data-testid="create-card" onClick={() => setOpenModal(true)}>Créer une carte mémoire</Button>
        <Button color='gray' onClick={() => handleQuiz()}>Commencer un questionnaire</Button>
        {
          startQuiz && (
            <Button color='gray' onClick={() => setStartQuiz(false)}>Arrêter le questionnaire</Button>
          )
        }
        <Button color='gray' className='border-none ml-auto underline'>
          <Link to='/cards'>Voir toutes les cartes</Link>
        </Button>
      </div>
      <div className='flex flex-row gap-6 mt-6'>
        {
          startQuiz && cards.map((card, index) => (
            <MyCard
              key={card.id}
              card={card} 
              handleAnswer={handleAnswer} 
              handleChangeAnswer={handleChangeAnswer} 
              handleForceAnswer={handleForceAnswer} 
              cardResponses={cardResponses} 
              answeredCards={answeredCards} />
          ))
        }
      </div>
      <MyModal 
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}  />
    </div>
  );
}

export default App;
