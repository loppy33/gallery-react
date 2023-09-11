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

const Header = (props) => {
    // const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const searchInputRef = useRef(null);
    const [liveSearchShow, setLiveSearchShow] = useState(false)
    const [liveSearchList, setLiveSearchList] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const [color, setColor] = useState('')

    const [activeLi, setActiveLi] = useState(-1)

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
            if (wordList.length > 1) {
                setLiveSearchList(wordList)
            } else { 
                setLiveSearchShow(false)
                setActiveLi(-1) 
            }
        }
        else { 
            setLiveSearchShow(false)
            setActiveLi(-1)
         }
    }

    const handleSearch = (event, orientation = '', size = '', color = '', word='') => {
        event.preventDefault();
        let searchValue;
        if (word) {
            searchValue = word.replace(/\s+/g, "_");
        } else {
            searchValue = searchInputRef.current.value.replace(/\s+/g, "_");
        }
        props.setHasMoreImages(true)
        props.setSearchInput({ query: searchValue, page: 0, orientation: orientation, size: size, color: color });
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
                            ref={searchInputRef} onInput={() => liveSearch()} onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch(event);
                                    setLiveSearchShow(false)
                                }
                                else if (event.key === 'ArrowDown') {

                                    setActiveLi((currentActiveLi) => {
                                        currentActiveLi = currentActiveLi + 1
                                        let ul = document.getElementsByClassName('liveSearch')[0]
                                        if (currentActiveLi > 4) {
                                            ul.scrollTo(0, ul.scrollTop + 30)
                                        }   
                                        return currentActiveLi
                                    })


                                }
                                else if (event.key === 'ArrowUp') {

                                    setActiveLi((currentActiveLi) => {
                                        currentActiveLi = currentActiveLi - 1
                                        let ul = document.getElementsByClassName('liveSearch')[0]
                                        console.log((ul.scrollTop - currentActiveLi  * 30));
                                        if ((ul.scrollTop - currentActiveLi  * 30) > 20) {
                                            ul.scrollTo(0, ul.scrollTop - 30)
                                        }   
                                        return currentActiveLi
                                    })
                                }
                            }} />
                            
                        <button onClick={handleSearch}><AiOutlineSearch className='s
                        earchIcon' /></button>

                        <ul className='liveSearch' style={liveSearchShow ? { opacity: 1, pointerEvents: 'auto' } : {}}>
                            {
                                liveSearchList.map((word, index) => (
                                    <li key={index}
                                        
                                        style={(activeLi % liveSearchList.length) === index ? {backgroundColor: '#dfdfe0'} : {}}
                                        onClick={(event) => {
                                            setSearchInputValue(word)
                                            setLiveSearchShow(false)
                                            setActiveLi(-1)
                                            handleSearch(event, undefined, undefined, undefined, word)
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
                            <a href="#/" onClick={(event) => handleSearch(event, '', props.searchInput.size, color)}>{props.searchInput.orientation === '' ? <BsCheck2 /> : ''}Любая ориетанция</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, 'landscape', props.searchInput.size, color)}>{props.searchInput.orientation === 'landscape' ? <BsCheck2 /> : ''} Горизонтальные</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, 'portrait', props.searchInput.size, color)}>{props.searchInput.orientation === 'portrait' ? <BsCheck2 /> : ''} Вертикальные</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, 'square', props.searchInput.size, color)}>{props.searchInput.orientation === 'square' ? <BsCheck2 /> : ''} Квадратные</a>
                        </li>
                    </ul>
                </div>

                <div className="filter">
                    <a href="#/" onClick={() => { props.setDropDowns(dropDowns => dropDowns === 'size' ? null : 'size') }}
                        style={props.searchInput.query ? props.searchInput.size ? { backgroundColor: '#dddddd50' } : {} : { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }} >Размер <MdOutlineKeyboardArrowDown /></a>

                    <ul style={props.dropDowns === 'size' ? { opacity: 1, pointerEvents: 'auto' } : {}}>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, '', color)}>{props.searchInput.size === '' ? <BsCheck2 /> : ''}Любые размеры</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, 'large', color)}>{props.searchInput.size === 'large' ? <BsCheck2 /> : ''} Большой</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, 'medium', color)}>{props.searchInput.size === 'medium' ? <BsCheck2 /> : ''} Средний</a>
                        </li>
                        <li>
                            <a href="#/" onClick={(event) => handleSearch(event, props.searchInput.orientation, 'small', color)}>{props.searchInput.size === 'small' ? <BsCheck2 /> : ''} Маленьнкий</a>
                        </li>
                    </ul>
                </div>

                <div className="filter">
                    <a href="#/"
                        style={props.searchInput.query ? props.searchInput.color ? { backgroundColor: '#dddddd50' } : {} : { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}>
                        Цвет <span style={color ? { backgroundColor: color } : {}}></span><input type="color" value='#ffffff' onChange={(event) => {
                            setColor(event.target.value)
                            handleSearch(event, props.searchInput.color, props.searchInput.size, color)
                        }} /></a>

                </div>
            </div>
        </div>
    );
};

export default Header;