import React, { useState, useEffect } from 'react';
import CardItem from '../cardItem/cardItem';
import './galleryList.css';

const GalleryList = (props) => {
  const [visibleCards, setVisibleCards] = useState([]);

  let [col1, col2, col3] = [[], [], []];
  for (let i = 0; i < props.data.length; i = i + 3) {
    col1.push(props.data[i]);
    if (typeof props.data[i + 1] !== 'undefined') {
      col2.push(props.data[i + 1]);
    }
    if (typeof props.data[i + 2] !== 'undefined') {
      col3.push(props.data[i + 2]);
    }
  }

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
        {col1.map((e, id) => (
          <CardItem
            image={e.img}
            likes={e.likes}
            key={id}
            id={id}
            isVisible={visibleCards.includes(id.toString())}
            initialVisible={id < 3} // Add this condition for the first 3 items in col1
          />
        ))}
      </div>
      <div className="cardsContainer">
        {col2.map((e, id) => (
          <CardItem
            image={e.img}
            likes={e.likes}
            key={id}
            id={id + col1.length}
            isVisible={visibleCards.includes((id + col1.length).toString())}
            initialVisible={id < 3} // Add this condition for the first 3 items in col2
          />
        ))}
      </div>
      <div className="cardsContainer" id="thirdContainer">
        {col3.map((e, id) => (
          <CardItem
            image={e.img}
            likes={e.likes}
            key={id}
            id={id + col1.length + col2.length}
            isVisible={visibleCards.includes((id + col1.length + col2.length).toString())}
            initialVisible={id < 3} // Add this condition for the first 3 items in col3
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryList;
