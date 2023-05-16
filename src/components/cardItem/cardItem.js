import { useState } from "react";

import MyImage from '../../assets/placeholder.png'

import './cardItem.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
// https://fontawesome.com/


const CardItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likes)
    const [canLike, setCanLike] = useState(true)
    const [isCommenting, setIsCommenting] = useState(false)

    const handleCommentButtonClick = () => {
        setIsCommenting(true);
    };

    
    // внутри useState передается Initial State (Состояние при создании & Состояние при рендере) 

    // const [objectState, setObjectState] = useState({
    //     name: null,
    //     id: 0,
    // })



    function imageHedler() {
        if (props.image) {
            return props.image
        }
        else {
            return MyImage
        }
    }

    // function evenHandler(id){
    //     if(id % 2 === 0){
    //         return {
    //             // marginLeft: '0' 
    //         };
    //     };

    // }

    return (
        // style={evenHandler(props.id)}
        <div className="cardBody" >
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
                    // setObjectState(state => ({...state, id: 1}))
                    // console.log(objectState.id)

                }}>
                    <div className="icon">

                    </div>
                    <p><FontAwesomeIcon icon={faHeart} /> Мне нравится: {likesCount}</p>
                </div>
                <button className="cardButton" onClick={handleCommentButtonClick}>Комментировать</button>
                {isCommenting && (
                    <div className="commentSection">
                        <input className="leaveCommentButton" placeholder="Оставить комментарий<"></input>
                    </div>
                )}
            </div>
            <div className="cardComments">

            </div>
        </div>
    );
};



export default CardItem;

// TODO При нажатии на кнопку комментировать, появлялся еще один текст с текст кнопкой оставить комментарий