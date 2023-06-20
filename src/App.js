import { useState, useEffect } from 'react';
import './App.css';
import AddPics from './components/addPics/addPics';
import GalleryList from './components/galleryList/galleryList';
import Header from './components/header/header';

function App() {
  const API_KEY = "vJZXoQSdIGFEHqC4ufZglpSUDZ9UtOIJJLvorxOA8C4OhhSDb8O82HNH";
  const PER_PAGE = 12; // Количество изображений, получаемых за один запрос

  const [cardsData, setCardsData] = useState([]);
  const [isModal, setModal] = useState(false);

  function handleCards(card) {
    let newCards = [
      {
        img: card,
        likes: 0,
        comments: null,
        favorites: false,
      },
      ...cardsData
    ];
    setCardsData(newCards);
  }
  
  useEffect(() => {
    // loadMoreImages();
    // Функция, которая будет вызвана при пересечении наблюдаемого элемента
    const handleIntersection = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // Пользователь долистал до конца страницы, загружаем новые изображения
        loadMoreImages();
      }
    };

    // Создание экземпляра Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Корневой элемент наблюдения, null - вся видимая область
      rootMargin: '0px', // Отступы от корневого элемента
      threshold: 0.1 // Порог видимости элемента, при котором вызывается обратный вызов
    });

    // Наблюдение за концом страницы
    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    // Загрузка первой порции изображений

    // Функция для загрузки изображений
    async function loadMoreImages() {
      let newPage = Math.floor(Math.random() * (1000 - 1) + 1);
      console.log(newPage);
      try {
        const url = `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${newPage}`;
        const response = await fetch(url, {
          headers: {
            'Authorization': API_KEY
          }
        });
        const data = await response.json();
        const newCards = data.photos.map(photo => ({
          img: photo.src.large,
          likes: Math.floor(Math.random() * 10000),
          comments: null,
          favorites: false
        }));

        // Фильтрация повторяющихся изображений
        const uniqueNewCards = newCards.filter(newCard => {
          return !cardsData.some(existingCard => existingCard.img === newCard.img);
        });

        setCardsData(prevData => [...prevData, ...uniqueNewCards]);
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [cardsData]);

  return (
    <div className="App">
      {isModal && <AddPics setModal={setModal} handleCards={handleCards}></AddPics>}
      <Header setModal={setModal}></Header>
      <GalleryList data={cardsData}></GalleryList>
      <div id="sentinel"><img src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif" alt="" /></div>
    </div>
  );
}

export default App;
