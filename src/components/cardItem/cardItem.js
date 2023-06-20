import { useState } from "react";

import MyImage from '../../assets/placeholder.png'

import './cardItem.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FaTelegramPlane } from 'react-icons/fa';

const CardItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likes)
    const [canLike, setCanLike] = useState(true)
    const [isCommenting, setIsCommenting] = useState(false)
    const [cardStyle, setCardStyle] = useState({})

    let cardTimeout;
    const handleCommentButtonClick = () => {
        if (isCommenting) {
            cardTimeout = setTimeout(() => {
                console.log(123)
                setCardStyle({})
            }, 3000)
            setIsCommenting(false);
        } else {
            clearTimeout(cardTimeout)
            setCardStyle({ zIndex: "10" })
            setIsCommenting(true);
        }
    };

    function imageHedler() {
        if (props.image) {
            return props.image
        }
        else {
            return MyImage
        }
    }

    return (
        <div className="cardBody" style={cardStyle}>
            <img src={imageHedler()} alt="" className="cardImage" />
            <div className="cardContent">
                <div className="like" onClick={() => {

                    if (canLike) {
                        setCanLike(false)

                        setLikesCount(state => state + 1);

                    }
                    else {
                        setCanLike(true)
                        setLikesCount(state => state - 1);
                    }


                }}>
                    <p><FontAwesomeIcon icon={faHeart} color={canLike ? 'gray' : 'red'} /> Нравится: {likesCount}</p>
                </div>
                <button className="cardButton" onClick={handleCommentButtonClick}>Комментировать <img src={props.image} alt="" /></button>

                <div className="commentSection" style={isCommenting ? { transform: "translateY(100%)" } : {}}>
                    <input className="commentInput" placeholder="Оставить комментарий"></input>
                    <FaTelegramPlane className="commentButton" />
                </div>
                {/* <div className="cardComments">
            </div> */}
            </div>
        </div>
    );
};

export default CardItem;
