import React, { useState, useEffect } from 'react';
import CardItem from '../cardItem/cardItem';
import './galleryList.css';

const GalleryList = (props) => {
    const [visibleCards, setVisibleCards] = useState([]);

    const { data } = props;
    const colsNumber = props.colsNumber;

    const cols = Array.from({ length: colsNumber }, () => []);

    let counter = 0;
    data.forEach((item, index) => {
        if (props.onlyFavorite && !item.favorites) {
            return;
        }
        const colIndex = counter % colsNumber;
        cols[colIndex].push(item);
        counter += 1
    });

    const generateCardItems = (col) => {
        return col.map((e, id) => (
            <CardItem
                image={e.img}
                likes={e.likes}
                favorites={e.favorites}
                key={id}
                id={e.id}
                isVisible={visibleCards.includes(e.id.toString())}
                initialVisible={id < 1}
                setCardsData={props.setCardsData}
                addFavorites={props.addFavorites}
                setFullScreen={props.setFullScreen}
                data={data}
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

    function manageWidth(colsNumber) {
        if (colsNumber === 2) {
            return colsNumber * 2
        }
        else if (colsNumber === 3) {
            return colsNumber + 1
        }
        else {
            return colsNumber
        }
    }

    return (
        <div className="galleryList">
            {cols.map((col, index) => (
                <div className="cardsContainer" key={index} style={
                    { width: `calc(100% / ${manageWidth(colsNumber)})` }
                }>
                    {generateCardItems(col)}
                </div>
            ))}
        </div>
    );
};

export default GalleryList;
