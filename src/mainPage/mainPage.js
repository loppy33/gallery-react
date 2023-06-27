import { useState, useEffect, useCallback, useRef } from 'react';
import './mainPage.css';
import AddPics from './addPics/addPics';
import GalleryList from './galleryList/galleryList';
import Header from './header/header';

import getImages from '../modules/getImages';

const PER_PAGE = 4;

function MainPage() {
  const [cardsData, setCardsData] = useState([]);
  const [isModal, setModal] = useState(false);
  const sentinelRef = useRef(null);
  const [searchInput, setSearchInput] = useState({ query: '', page: 0 });
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const [colsNumber, setColsNumber] = useState(3)

  const handleCards = useCallback((card) => {
    setCardsData(prevData => [
      {
        img: card,
        likes: 0,
        comments: null,
        favorites: false,
      },
      ...prevData
    ]);
  }, []);

  const loadMoreImages = useCallback(async () => {
    try {
      const data = await getImages(PER_PAGE * colsNumber, searchInput, setSearchInput)

      const newCards = data.photos.map(photo => ({
        img: photo.src.large,
        likes: Math.floor(Math.random() * 10000),
        comments: null,
        favorites: false,
      }));

      setCardsData(prevData => {
        const existingImages = new Set(prevData.map(card => card.img));
        const uniqueNewCards = newCards.filter(newCard => !existingImages.has(newCard.img));
        const newData = [...prevData, ...uniqueNewCards];
        return newData;
      });

      console.log(data.photos.length);
      if (data.photos.length < 1) {
        setHasMoreImages(false);

      } else {
        setHasMoreImages(true);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [cardsData, hasMoreImages]);

  useEffect(() => {
    const handleIntersection = ([entry]) => {
      const { isIntersecting } = entry;
      console.log(isIntersecting, hasMoreImages);
      if (isIntersecting && hasMoreImages) {
        loadMoreImages();
      } else if (!hasMoreImages) {
        console.log('тут типа запуск повторной попытки через...');
        setTimeout(() => {
          setHasMoreImages(true);
          loadMoreImages();
        }, 1000)
      }
    };

    const options = {
      root: null,
      rootMargin: `600px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
    // eslint-disable-next-line
  }, [cardsData]);

  useEffect(() => {
    const storeData = localStorage.getItem('cardsData');
    if (storeData) {
      setCardsData(JSON.parse(storeData));
    }
  }, []);

  useEffect(() => {
    // Сохранение при обновлении cardsData
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
  }, [cardsData]);

  return (
    <div className="mainPage">
      {isModal && <AddPics setModal={setModal} handleCards={handleCards} />}

      <Header
        setModal={setModal}
        loadMoreImages={loadMoreImages}
        setSearchInput={setSearchInput}
        setCardsData={setCardsData}
        setHasMoreImages={setHasMoreImages}
        setColsNumber={setColsNumber}
      />

      <div className="gallery-list">
        <GalleryList data={cardsData} colsNumber={colsNumber} />
        <img src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif" alt="" className="loading" />
      </div>
      
      <div ref={sentinelRef}></div>
    </div>
  );
}

export default MainPage;

