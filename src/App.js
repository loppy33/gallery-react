import { useState } from 'react';
import './App.css';
import AddPics from './components/addPics/addPics';
import GalleryList from './components/galleryList/galleryList';

import Header from './components/header/header'

function App() {
  const cardsData = [
    {
      img: 'https',
      likes: 0,
      comments: null,
      favorites: false,
    },
    {
      img: 'https',
      likes: 5,
      comments: null,
      favorites: false,
    },
    {
      img: 'https',
      likes: 15,
      comments: null,
      favorites: false,
    },
    {
      img: 'https',
      likes: 125,
      comments: null,
      favorites: false,
    },
  ]

  const [isModal, setModal] = useState(false);
  console.log(isModal)

  return (
    <div className="App">
      {
        isModal === true ? <AddPics setModal={setModal}></AddPics>: null
      }
      <Header setModal={setModal}></Header>
      <GalleryList data={cardsData}></GalleryList>
    </div>
  );
}

export default App;


