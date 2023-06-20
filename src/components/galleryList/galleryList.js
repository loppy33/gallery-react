import React, { useState, useEffect } from 'react';
import CardItem from '../cardItem/cardItem';
import './galleryList.css';

const GalleryList = (props) => {
    const [visibleCards, setVisibleCards] = useState([]);

    const { data } = props;

    const [col1, col2, col3] = data.reduce((cols, item, index) => {
        const colIndex = index % 3;
        cols[colIndex].push(item);
        return cols;
    }, [[], [], []]);

    const generateCardItems = (col, startIndex) => {
        return col.map((e, id) => (
            <CardItem
                image={e.img}
                likes={e.likes}
                key={id}
                id={id + startIndex}
                isVisible={visibleCards.includes((id + startIndex).toString())}
                initialVisible={id < 3}
            />
        ));
    };

    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.cardBody');
            const windowHeight = window.innerHeight;

            const visibleCardIds = [];
            cards.forEach((card) => {
                const cardTop = card.getBoundingClientRect().top;

                if (cardTop < windowHeight) {
                    visibleCardIds.push(card.id);
                }
            });

            setVisibleCards(visibleCardIds);
        };

        const initialVisibleCards = Array.from(document.querySelectorAll('.cardBody'))
            .slice(0, 9)
            .map((card) => card.id);
        setVisibleCards(initialVisibleCards);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="galleryList">
            <div className="cardsContainer">
                {generateCardItems(col1, 0)}
            </div>
            <div className="cardsContainer">
                {generateCardItems(col2, col1.length)}
            </div>
            <div className="cardsContainer" id="thirdContainer">
                {generateCardItems(col3, col1.length + col2.length)}
            </div>
        </section>
    );
};

export default GalleryList;
