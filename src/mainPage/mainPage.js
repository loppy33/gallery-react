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
  const [onlyFavorite, setOnlyFavorite] = useState(false)
  const sentinelRef = useRef(null);
  const [searchInput, setSearchInput] = useState({ query: '', page: 0 });
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const [colsNumber, setColsNumber] = useState(3)

  const handleCards = useCallback((id, card, alt) => {
    setCardsData(prevData => [
      {
        id: id,
        img: card,
        likes: 0,
        comments: null,
        favorites: false,
        alt: alt,
      },
      ...prevData
    ]);
  }, []);

  const loadMoreImages = useCallback(async () => {
    try {
      let data = [];

      if (onlyFavorite) {

        cardsData.forEach(async (card) => {
          if (card.favorites) {
            data.push(await getImages(PER_PAGE * colsNumber, searchInput, setSearchInput, card.id))
          }
        })

      } else {
        data = await getImages(PER_PAGE * colsNumber, searchInput, setSearchInput)
      }

      const newCards = data.photos.map(photo => ({
        id: photo.id,
        img: photo.src.large,
        likes: Math.floor(Math.random() * 10000),
        comments: null,
        favorites: false,
        alt: photo.alt,
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
      console.log(isIntersecting, hasMoreImages, onlyFavorite);

      if (isIntersecting && hasMoreImages && !onlyFavorite) {
        loadMoreImages();
      } else if (!hasMoreImages && isIntersecting && !onlyFavorite) {
        console.log('Запуск повторной попытки поиска изображений...');

        const retryTimeout = setTimeout(() => {
          setHasMoreImages(true);
          loadMoreImages();
        }, 3000);

        return () => {
          clearTimeout(retryTimeout);
        };
      }
    };

    const options = {
      root: null,
      rootMargin: `50px`,
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
  }, [cardsData, colsNumber]);



  function addFavorites(id) {
    let newCardsData = cardsData.slice();
    let favoriteImage = newCardsData.find(el => el['id'] === id)

    console.log(favoriteImage);

    favoriteImage.favorites = !favoriteImage.favorites
    setCardsData(newCardsData)
  }

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
        setOnlyFavorite={setOnlyFavorite}
        onlyFavorite={onlyFavorite}
      />

      <div className="gallery-list">
        <GalleryList data={cardsData} colsNumber={colsNumber} setCardsData={setCardsData} onlyFavorite={onlyFavorite} addFavorites={addFavorites} />
        {!onlyFavorite ? <img src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif" alt="" className="loading" /> : ''}

      </div>

      <div ref={sentinelRef}></div>
    </div>
  );
}

export default MainPage;

// TODO сделать сохранения избранных