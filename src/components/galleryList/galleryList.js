import React, { useState, useEffect } from 'react';
import CardItem from '../cardItem/cardItem';
import './galleryList.css';

const GalleryList = (props) => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [colsNumber, setColsNumber] = useState(3)

    const { data } = props;

    const [col1, col2, col3] = data.reduce((cols, item, index) => {
        const colIndex = index % 3;
        cols[colIndex].push(item);
        return cols;
    }, [[], [], []]);

    const generateCardItems = (col) => {
        return col.map((e, id) => (
            <CardItem
                image={e.img}
                likes={e.likes}
                key={id}
                id={id}
                isVisible={visibleCards.includes((id).toString())}
                initialVisible={id < 1}
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


        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="galleryList">
            
            <div className="cardsContainer">
                {generateCardItems(col1)}
            </div>
            <div className="cardsContainer">
                {generateCardItems(col2)}
            </div>
            <div className="cardsContainer" id="thirdContainer">
                {generateCardItems(col3)}
            </div>
        </section>
    );
};

export default GalleryList;
