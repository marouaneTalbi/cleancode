import React, { useContext, useState } from "react";
import { Button, Modal, Label, TextInput, Card } from 'flowbite-react';


export default function MyCard({card, handleAnswer, handleChangeAnswer, handleForceAnswer, cardResponses, answeredCards}) {

    return (
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
    )
}