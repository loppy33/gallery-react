import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import AddPics from './components/addPics/addPics';
import GalleryList from './components/galleryList/galleryList';
import Header from './components/header/header';

const API_KEY = "vJZXoQSdIGFEHqC4ufZglpSUDZ9UtOIJJLvorxOA8C4OhhSDb8O82HNH";
const PER_PAGE = 12;
const THRESHOLD = 600;

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [isModal, setModal] = useState(false);
  const sentinelRef = useRef(null);
  const [searchInput, setSearchInput] = useState({ query: '', page: 0 });
  const [hasMoreImages, setHasMoreImages] = useState(true);

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
      let url;
      const newPage = Math.floor(Math.random() * 999) + 1;
      if (searchInput.query.length === 0) {
        url = `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${newPage}`;
      } else {
        url = `https://api.pexels.com/v1/search?query=${searchInput.query}&per_page=${PER_PAGE}&page=${searchInput.page + 1}`;
        setSearchInput(prevSearchInput => ({ ...prevSearchInput, page: prevSearchInput.page + 1 }));
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
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

      if (data.photos.length < PER_PAGE) {
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
      if (isIntersecting && hasMoreImages) {
        loadMoreImages();
      }
    };

    const options = {
      root: null,
      rootMargin: `${THRESHOLD}px`,
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
    <div className="App">
      {isModal && <AddPics setModal={setModal} handleCards={handleCards} />}
      <Header setModal={setModal} loadMoreImages={loadMoreImages} setSearchInput={setSearchInput} setCardsData={setCardsData} setHasMoreImages={setHasMoreImages} />
      <div className="gallery-list">
        <GalleryList data={cardsData} />
        <img src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif" alt="" className="loading" />
      </div>
      <div ref={sentinelRef}></div>
    </div>
  );
}

export default App;
