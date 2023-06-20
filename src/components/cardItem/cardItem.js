import React, { useState, useEffect } from 'react';
import MyImage from '../../assets/placeholder.png';
import './cardItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaTelegramPlane } from 'react-icons/fa';

const CardItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likes);
    const [canLike, setCanLike] = useState(true);
    const [isCommenting, setIsCommenting] = useState(false);
    const [cardStyle, setCardStyle] = useState({});

    useEffect(() => {
        if (isCommenting) {
            const cardTimeout = setTimeout(() => {
                setCardStyle({});
            }, 3000);

            return () => {
                clearTimeout(cardTimeout);
            };
        }
    }, [isCommenting]);

    const imageHandler = () => {
        if (props.image) {
            return props.image;
        } else {
            return MyImage;
        }
    };

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
            <img src={imageHandler()} alt="" className="cardImage" />
            <div className="cardContent">
                <div
                    className="like"
                    onClick={() => {
                        if (canLike) {
                            setCanLike(false);
                            setLikesCount((state) => state + 1);
                        } else {
                            setCanLike(true);
                            setLikesCount((state) => state - 1);
                        }
                    }}
                >
                    <p>
                        <FontAwesomeIcon icon={faHeart} color={canLike ? 'gray' : 'red'} /> Нравится: {likesCount}
                    </p>
                </div>
                <button className="cardButton" onClick={handleCommentButtonClick}>
                    Комментировать <img src={props.image} alt="" />
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
