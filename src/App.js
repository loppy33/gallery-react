import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import AddPics from './components/addPics/addPics';
import GalleryList from './components/galleryList/galleryList';
import Header from './components/header/header';

const API_KEY = "vJZXoQSdIGFEHqC4ufZglpSUDZ9UtOIJJLvorxOA8C4OhhSDb8O82HNH";
const PER_PAGE = 12;
const THRESHOLD = 600; // Пороговое значение, чтобы определить, когда начинать загрузку новых изображений

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [isModal, setModal] = useState(false);
  const sentinelRef = useRef(null);

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
    const newPage = Math.floor(Math.random() * (1000 - 1) + 1);
    console.log(newPage);
    try {
      const url = `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${newPage}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': API_KEY,
        }
      });
      const data = await response.json();
      const newCards = data.photos.map(photo => ({
        img: photo.src.large,
        likes: Math.floor(Math.random() * 10000),
        comments: null,
        favorites: false
      }));

      const uniqueNewCards = newCards.filter(newCard => {
        return !cardsData.some(existingCard => existingCard.img === newCard.img);
      });

      setCardsData(prevData => [...prevData, ...uniqueNewCards]);
    } catch (error) {
      console.log(error);
    } 
  }, [cardsData]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMoreImages();
      }
    };

    const options = {
      root: null,
      rootMargin: `${THRESHOLD}px`, // Добавляем пороговое значение к rootMargin
      threshold: 0.1
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
  }, [loadMoreImages]);



  return (
    <div className="App">
      {isModal && <AddPics setModal={setModal} handleCards={handleCards}></AddPics>}
      <Header setModal={setModal}></Header>
       
          <GalleryList data={cardsData} />

      <div ref={sentinelRef}></div> {/* Используем ref для элемента-стража */}
    </div>
  );
}

export default App;
