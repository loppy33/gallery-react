import './header.css';
import Backgroudnd from '../../assets/placehold.png';
import Avatar from '../../assets/avatar.png';

import { LuBell } from 'react-icons/lu';
import { AiFillMessage, AiOutlineSearch, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { BiImageAlt } from 'react-icons/bi';
import { BsCheck2 } from 'react-icons/bs';


import { BsStar } from 'react-icons/bs';
import React, { useRef, useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';

import { commonWords } from '../../modules/words';
// console.log(commonWords);

const Header = (props) => {
    // const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const searchInputRef = useRef(null);
    const [liveSearchShow, setLiveSearchShow] = useState(false)
    const [liveSearchList, setLiveSearchList] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const [activeLi, setActiveLi] = useState(null)

    const toggleOptions = () => {
        props.setOnlyFavorite(!props.onlyFavorite);
    };

    const liveSearch = () => {
        setSearchInputValue(searchInputRef.current.value)
        if (searchInputRef.current.value.length > 0) {
            setLiveSearchShow(true)
            let wordList = [];
            for (let word of commonWords) {
                if (
                    word.slice(0, searchInputRef.current.value.length) === searchInputRef.current.value
                ) {

                    wordList.push(word)
                }
            }
            setLiveSearchList(wordList)
        }
        else { setLiveSearchShow(false) }
    }

    const handleSearch = (event, orientation = '', size = '') => {
        event.preventDefault();
        const searchValue = searchInputRef.current.value.replace(/\s+/g, "_");
        props.setHasMoreImages(true)
        props.setSearchInput({ query: searchValue, page: 0, orientation: orientation, size: size });
        props.setCardsData([]);
    };

    const parallaxEffect = () => {
        const background = document.querySelector('.background');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const parallaxValue = scrollPosition * 0.4;

            background.style.transform = `translateY(-${parallaxValue}px)`;
        });
    };
    useEffect(() => {
        parallaxEffect();
        // document.onkeydown = (event) => {
        //     if (event.key === 'ArrowDown') {
        //         // let newActiveLi = activeLi === null ? 0 : activeLi + 1
        //         // setActiveLi(newActiveLi)
        //         if(activeLi) {
        //             let newActiveLi = activeLi
        //             setActiveLi(newActiveLi+1)
        //             console.log(activeLi);
        //         } else { setActiveLi(0) }
        //         console.log(activeLi);
        //     }
        // }
    }, []);

    return (
        <div className='header' >
            <div className="mainInfo">
                <div className="staticInteractiv">
                    <div className="leftContent">
                        <a href="#/"><span className='logoName'>W</span>alpirest</a>
                    </div>
                    <div className="rightContent">
                        <a href="#/" className='infoIocn'><LuBell /></a>
                        <a href="#/" className='infoIocn'><AiFillMessage /></a>
                        <a href="#/"><img src={Avatar} alt="" /></a>
                        <a href="#/" className='loadImage' onClick={() => props.setModal(true)}>Загрузка</a>
                    </div>
                </div>
                <div className="manage">
                    <h2>Лучшие бесплатные стоковые фото,<br />изображения без роялти и видео от<br />талантливых авторов.</h2>
                    <div className="searchInputContainer" style={liveSearchShow ? { borderRadius: '1vh 1vh 0 0' } : {}}>
                        <div className="customSelect" onClick={toggleOptions}>
                            <div className="selectedOption">
                                <span className="icon"><BiImageAlt /></span>
                                <span className="text">Все фото</span>
                            </div>
                            {props.onlyFavorite && (
                                <div className="selectedOption">
                                    <span className="icon"><BsStar /></span>
                                    <span className="text">Избранное</span>
                                </div>

                            )}
                        </div>
                        <input type="text" value={searchInputValue} placeholder="Поиск бесплатных изображений"
                            ref={searchInputRef} onInput={() => liveSearch()} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch(event);
                                }
                            }} />
                        <button onClick={handleSearch}><AiOutlineSearch className='s
                        earchIcon' /></button>

                        <ul className='liveSearch' style={liveSearchShow ? { opacity: 1, pointerEvents: 'auto' } : {}}>
                            {
                                liveSearchList.map((word, index) => (
                                    <li key={index}
                                    // onKeyDown={(event) => {
                                    //     // console.log(event.key);
                                    // }}
                                        onClick={(event) => {
                                            setSearchInputValue(word)
                                            setLiveSearchShow(!liveSearchShow)
                                            handleSearch(event)
                                        }}>{word}</li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
                <img className='background' src={Backgroudnd} alt="" />
            </div>
            <div className="filters">
                <div className="zoom">
                    <a href="#/" className='zoomButton' onClick={() => props.setColsNumber(colsNumber => colsNumber > 1 ? colsNumber - 1 : colsNumber)}><AiOutlineZoomOut /></a>
                    <a href="#/" className='zoomButton' onClick={() => props.setColsNumber(colsNumber => colsNumber < 10 ? colsNumber + 1 : colsNumber)}><AiOutlineZoomIn /></a>
                </div>
                <div className="filter">
                    <a href="#/" onClick={() => { props.setDropDowns(dropDowns => dropDowns === 'orientation' ? null : 'orientation') }}
                        style={props.searchInput.query ? props.searchInput.orientation ? { backgroundColor: '#dddddd50' } : {} : { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }} >Ориентация <MdOutlineKeyboardArrowDown /></a>

                    <ul style={props.dropDowns === 'orientation' ? { opacity: 1, pointerEvents: 'auto' } : {}}>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, '', props.searchInput.size)}>{props.searchInput.orientation === '' ? <BsCheck2 /> : ''}Любая ориетанция</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, 'landscape', props.searchInput.size)}>{props.searchInput.orientation === 'landscape' ? <BsCheck2 /> : ''} Горизонтальные</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, 'portrait', props.searchInput.size)}>{props.searchInput.orientation === 'portrait' ? <BsCheck2 /> : ''} Вертикальные</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, 'square', props.searchInput.size)}>{props.searchInput.orientation === 'square' ? <BsCheck2 /> : ''} Квадратные</a>
                        </li>
                    </ul>
                </div>

                <div className="filter">
                    <a href="#/" onClick={() => { props.setDropDowns(dropDowns => dropDowns === 'size' ? null : 'size') }}
                        style={props.searchInput.query ? props.searchInput.size ? { backgroundColor: '#dddddd50' } : {} : { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }} >Размер <MdOutlineKeyboardArrowDown /></a>

                    <ul style={props.dropDowns === 'size' ? { opacity: 1, pointerEvents: 'auto' } : {}}>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, '')}>{props.searchInput.size === '' ? <BsCheck2 /> : ''}Любые размеры</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, 'large')}>{props.searchInput.size === 'large' ? <BsCheck2 /> : ''} Большой</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, 'medium')}>{props.searchInput.size === 'medium' ? <BsCheck2 /> : ''} Средний</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, 'small')}>{props.searchInput.size === 'small' ? <BsCheck2 /> : ''} Маленьнкий</a>
                        </li>
                    </ul>
                </div>

                <div className="filter">
                    <a href="#/">Цвет <span></span><input type="color" value='#ffffff'/></a>
                    
                </div>
            </div>
        </div>
    );
};

export default Header;

// TODO  убрать скрол бар в лайф серч, и сделать поиск по цвету