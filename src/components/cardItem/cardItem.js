import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaTelegramPlane } from 'react-icons/fa';

import { LuDownload } from 'react-icons/lu';
import { BsStar } from 'react-icons/bs';

import MyImage from '../../assets/placeholder.png';
import './cardItem.css';

const CardItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likes);
    const [canLike, setCanLike] = useState(true);
    const [isCommenting, setIsCommenting] = useState(false);
    const [cardStyle, setCardStyle] = useState({});

    useEffect(() => {
        let cardTimeout;
        if (isCommenting) {
            cardTimeout = setTimeout(() => {
                setCardStyle({});
            }, 3000);
        }

        return () => {
            clearTimeout(cardTimeout);
        };
    }, [isCommenting]);

    const imageHandler = () => props.image ? props.image : MyImage;

    const handleCommentButtonClick = () => {
        if (isCommenting) {
            setIsCommenting(false);
        } else {
            setCardStyle({ zIndex: '10' });
            setIsCommenting(true);
        }
    };

    return (
        <div className={`cardBody ${props.isVisible || props.initialVisible ? 'show' : '' }`} style={cardStyle} id={props.id}>
            <div className="buttonsImage">
                <BsStar className='buttonImage favorite'/>
                <LuDownload  className='buttonImage download'/>
            </div>
            <img src={imageHandler()} alt="" className="cardImage" />
            <div className="cardContent">
                <div className="like" onClick={() => {
                    setCanLike(!canLike);
                    setLikesCount(state => state + (canLike ? 1 : -1));
                }}>
                    <p>
                        <FontAwesomeIcon icon={faHeart} color={canLike ? 'gray' : 'red'} /> Нравится: {likesCount}
                    </p>
                </div>
                <button className="cardButton" onClick={handleCommentButtonClick}>
                    Комментировать <img src={imageHandler()} alt="" />
                </button>
                <div className="commentSection" style={isCommenting ? { transform: 'translateY(100%)' } : {}}>
                    <input className="commentInput" placeholder="Оставить комментарий" />
                    <FaTelegramPlane className="commentButton" />
                </div>
            </div>
        </div>
    );
};

export default CardItem;
