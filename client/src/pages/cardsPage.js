'use client';
import React, {useEffect, useState} from 'react'
import { getCards } from '../services/cardServices';
import { Card, Badge, Label, Select } from 'flowbite-react';

export default function CardsPage() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const cards = await getCards();
            setCards(cards);
        }
        fetchCards();
    }, []);


  return (
    <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Cartes mémoire</h1>
        <div className="flex flex-row gap-6 mt-6 w-full">
            <form className='max-w-sm'>
                <div className="mb-2 block">
                    <Label htmlFor="tags" value="Selectionne un Tag" />
                </div>
                <Select id="tags" required>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                </Select>
            </form>
            <form className='max-w-sm'>
                <div className="mb-2 block">
                    <Label htmlFor="categories" value="Selectionne une catégorie" />
                </div>
                <Select id="categories" required>
                    <option>un</option>
                    <option>deux</option>
                    <option>trois</option>
                    <option>quatre</option>
                    <option>cinq</option>
                    <option>six</option>
                    <option>sept</option>
                </Select>
            </form>
        </div>
        <div className="flex flex-row gap-6 mt-6">
            {cards.map(card => (
                <Card className="max-w-sm cursor-pointer">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {card.question}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Réponse : {card.answer}
                    </p>
                    <div className="mt-4 w-max">
                        <Badge color="purple">#{card.tag}</Badge>

                    </div>
                </Card>            
            ))}
        </div>
    </div>
  )
}
