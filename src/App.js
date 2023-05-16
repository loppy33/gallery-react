import { useState } from 'react';
import './App.css';
import AddPics from './components/addPics/addPics';
import GalleryList from './components/galleryList/galleryList';

import Header from './components/header/header'

function App() {
  const [cardsData, setCardsData] = useState(
    [{
      img: 'https',
      likes: 12,
      comments: null,
      favorites: false,
    },]);

  const [isModal, setModal] = useState(false);
  function handleCards(card) {
    setCardsData(...cardsData, [card])
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


