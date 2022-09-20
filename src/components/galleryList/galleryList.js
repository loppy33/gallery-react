import CardItem from '../cardItem/cardItem';
import './galleryList.css';


const GalleryList = (props) => {


    return(
        <section className="galleryList">
            <div className="cardsContainer">
                {
                    props.data.map((e, id) => (<CardItem likes={e.likes} key={id} id={id}></CardItem>))
                }
            </div>
        </section>
    );
};

export default GalleryList;

