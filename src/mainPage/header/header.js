import './header.css';
import Backgroudnd from '../../assets/placehold.png';
import Avatar from '../../assets/avatar.png';

import { LuBell } from 'react-icons/lu';
import { AiFillMessage, AiOutlineSearch, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

import { BiImageAlt } from 'react-icons/bi';

import { BsStar } from 'react-icons/bs';
import React, { useRef, useEffect, useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import { drop } from 'lodash';


const Header = (props) => {
    // const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const searchInputRef = useRef(null);
    console.log(props.searchInput.query ? 'yes' : 'no');
    const toggleOptions = () => {
        props.setOnlyFavorite(!props.onlyFavorite);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchValue = searchInputRef.current.value.replace(/\s+/g, "_");
        props.setHasMoreImages(true)
        props.setSearchInput({ query: searchValue, page: 0 });
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
        <div className='header'>
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
                    <div className="searchInputContainer">
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
                        <input type="text" placeholder="Поиск бесплатных изображений" ref={searchInputRef} onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch(event);
                            }
                        }} />
                        <button onClick={handleSearch}><AiOutlineSearch className='searchIcon' /></button>
                    </div>
                </div>
                <img className='background' src={Backgroudnd} alt="" />
            </div>
            <div className="filters">
                <div className="zoom">
                    <a href="#/" className='zoomButton' onClick={() => props.setColsNumber(colsNumber => colsNumber > 1 ? colsNumber - 1 : colsNumber)}><AiOutlineZoomOut /></a>
                    <a href="#/" className='zoomButton' onClick={() => props.setColsNumber(colsNumber => colsNumber < 10 ? colsNumber + 1 : colsNumber)}><AiOutlineZoomIn /></a>
                </div>
                <div className="orientation">
                    <a href="#/" onClick={() => { props.setDropDowns(dropDowns => dropDowns === 'orientation' ? null : 'orientation') }}
                        style={props.searchInput.query ? {} : { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }} >Ориентация</a>

                    <ul style={props.dropDowns === 'orientation' ? { opacity: 1, pointerEvents: 'auto' } : {}}>
                        <li>
                            <a href="#/">Любая ориетанция</a>
                        </li>
                        <li>
                            <a href="#/">Горизонтальные</a>
                        </li>
                        <li>
                            <a href="#/">Вертикальные</a>
                        </li>
                        <li>
                            <a href="#/">Квадратные</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
