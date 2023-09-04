import React, { useState, useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { FaTelegramPlane } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { BsStar } from 'react-icons/bs';

import MyImage from '../../assets/placeholder.png';
import './cardItem.css';


const CardItem = (props) => {
    // eslint-disable-next-line
    const [likesCount, setLikesCount] = useState(props.likes);
    const [canFavorites, setCanFavorites] = useState(props.favorites)
    const [canLike, setCanLike] = useState(true);

    const [isCommenting, setIsCommenting] = useState(false);
    const [cardStyle, setCardStyle] = useState({});
    const [isImageLoaded, setIsImageLoaded] = useState(false); // Состояние загрузки изображения


    useEffect(() => {
        let cardTimeout;
        if (!isCommenting) {
            cardTimeout = setTimeout(() => {
                setCardStyle({});
            }, 3000);
            return () => {
                clearTimeout(cardTimeout);
            };
        }

    }, [isCommenting]);

    const handleCommentButtonClick = () => {
        if (isCommenting) {
            setIsCommenting(false);
        } else {
            setCardStyle({ zIndex: '10' });
            setIsCommenting(true);
        }
    };

    const imageHandler = () => (props.image ? props.image : MyImage);

    const handleImageLoad = () => {
        console.log(123);
        setIsImageLoaded(true);
    };

    return (
        <div
            className={`cardBody ${(props.isVisible || props.initialVisible) && isImageLoaded ? 'show' : '' // Показывать cardBody только после полной загрузки изображения
                }`}
            style={cardStyle}
            id={props.id}
            key={props.id}
            
        >
            <div className="buttonsImage">

            </div>
            <div className="first">
                    <BsStar className="buttonImage favorite"
                        color={props.favorites ? '#fdd910' : 'gray'}
                        onClick={() => {
                            console.log(props.id);
                            setCanFavorites(!canFavorites);
                            props.addFavorites(props.id)
                            // props.setCardsData()

                        }} />
                    <a href="https://images.pexels.com/photos/4737484/pexels-photo-4737484.jpeg" download="AwesomeImage.png"><LuDownload className="buttonImage download" /></a>
                </div>
                <div className="second">
                    <AiOutlineHeart
                        className="buttonImage like"
                        color={canLike ? 'gray' : 'red'}
                        onClick={() => {
                            setCanLike(!canLike);
                            setLikesCount((state) => state + (canLike ? 1 : -1));
                        }}
                    />
                    <BiComment className="buttonImage comment" onClick={handleCommentButtonClick} />
                </div>
            <div className="commentSection" style={isCommenting ? { transform: 'translateY(100%)' } : {}}>
                <input className="commentInput" placeholder="Оставить комментарий" />
                <FaTelegramPlane className="commentButton" />
            </div>
            <img src={imageHandler()} alt="" className="cardImage" onLoad={handleImageLoad} onClick={() => {
                props.setFullScreen(1)
                // console.log(props.data);
            }}/>
        </div>
    );
};

export default CardItem;
