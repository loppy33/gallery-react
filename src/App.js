import { useState } from 'react';
import './App.css';
import AddPics from './components/addPics/addPics';
import GalleryList from './components/galleryList/galleryList';

import Header from './components/header/header'

function App() {
  const [cardsData, setCardsData] = useState(
    [{
      img: 'https://images.pexels.com/photos/16664503/pexels-photo-16664503/free-photo-of-femme-eau-montagne-chapeau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 51,
      comments: null,
      favorites: false,
    },
    {
      img: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
      likes: 12,
      comments: null,
      favorites: false,
    },
    {
      img: 'https://besthqwallpapers.com/Uploads/18-4-2020/128953/federa-lake-4k-beautiful-nature-summer-mountains.jpg',
      likes: 3,
      comments: null,
      favorites: false,
    },
    {
      img: 'https://w-dog.ru/wallpapers/3/17/328122031928999/kosmicheskij-mir-v-serom-cvete.jpg',
      likes: 17,
      comments: null,
      favorites: false,
    },
    ]);

  const [isModal, setModal] = useState(false);

  function handleCards(card) {
    let newCards = [...cardsData]
    let newCard = {
      img: card,
      likes: 12,
      comments: null,
      favorites: false,
    }
    newCards.splice(0, 0, newCard)
    // newCards.push(newCard)
    setCardsData(newCards)
  }
  //  useEffect - вызывается после загрузки компонента 
  // useEffect(() => {
  //   setCardsData([
  //     ...cardsData,
  //     [
  //       {
  //         img: 'https',
  //         likes: 125,
  //         comments: null,
  //         favorites: false,
  //       },]
  //   ])
  // })

  return (
    <div className="App">
      {
        isModal === true ? <AddPics setModal={setModal} handleCards={handleCards}></AddPics> : null
      }
      <Header setModal={setModal}></Header>
      <GalleryList data={cardsData}></GalleryList>
    </div>
  );
}

export default App;


