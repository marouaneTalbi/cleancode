'use client';
import React, {useEffect, useState} from 'react'
import { getAllCards } from '../services/cardServices';
import { Card, Badge, Label, Select, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function CardsPage() {
    const [cards, setCards] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            const cardsData = await getAllCards();
            setCards(cardsData);
            const uniqueTags = [...new Set(cardsData.map(card => card.tag))];
            setTags(uniqueTags);
        }

        fetchCards();
    }, []);

    const filteredCards = cards.filter(card => {
        if (selectedTag && selectedCategory) {
            return card.tag === selectedTag && card.category === selectedCategory;
        } else if (selectedTag) {
            return card.tag === selectedTag;
        } else if (selectedCategory) {
            return card.category === selectedCategory;
        } else {
            return true;
        }
    });

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

  return (
    <div className="p-4">
        <div className='flex flex-row items-center'>
            <h1 className="text-3xl font-bold">Cartes mémoire</h1>
            <Button color='gray' className='border-none ml-auto underline'>
                <Link to='/'>Accueil</Link>
            </Button>
        </div>
        <div className="flex flex-row gap-6 mt-6 w-full">
            <form className='max-w-sm'>
                <div className="mb-2 block">
                    <Label htmlFor="tags" value="Selectionne un Tag" />
                </div>
                <Select id="tags" value={selectedTag} onChange={handleTagChange} required>
                    <option value="">-Tous-</option>
                    {tags.map((tag, index) => (
                        <option key={index} value={tag}>{tag}</option>
                    ))}
                </Select>
            </form>
            <form className='max-w-sm'>
                <div className="mb-2 block">
                    <Label htmlFor="categories" value="Selectionne une catégorie" />
                </div>
                <Select id="categories" value={selectedCategory} onChange={handleCategoryChange} required>
                    <option value="">-Tous-</option>
                    <option>FIRST</option>
                    <option>SECOND</option>
                    <option>THIRD</option>
                    <option>FOURTH</option>
                    <option>FIFTH</option>
                    <option>SIXTH</option>
                    <option>SEVENTH</option>
                </Select>
            </form>
        </div>
        <div className="flex flex-row gap-6 mt-6">
            {filteredCards.map((card, index) => (
                <Card key={index} className="max-w-sm cursor-pointer">
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
            {filteredCards.length === 0 && (
                <p>Aucune carte mémoire ne correspond à votre recherche.</p>
            )}
        </div>
    </div>
  )
}
