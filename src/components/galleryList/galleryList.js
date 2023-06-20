import CardItem from '../cardItem/cardItem';
import './galleryList.css';


const GalleryList = (props) => {
    let [col1, col2, col3] = [[], [], []];
    for (let i = 0; i < props.data.length; i = i + 3) {

        col1.push(props.data[i])
        if (typeof (props.data[i + 1]) != "undefined") { col2.push(props.data[i + 1]) }
        if (typeof (props.data[i + 2]) != "undefined") { col3.push(props.data[i + 2]) }
    }

    return (
        <section className="galleryList">
            <div className="cardsContainer">
                {
                    col1.map((e, id) => (<CardItem image={e.img} likes={e.likes} key={id} id={id}></CardItem>))
                }
            </div>
            <div className="cardsContainer">
                {
                    col2.map((e, id) => (<CardItem image={e.img} likes={e.likes} key={id} id={id}></CardItem>))
                }
            </div>
            <div className="cardsContainer" id='thirdContainer'>
                {
                    col3.map((e, id) => (<CardItem image={e.img} likes={e.likes} key={id} id={id}></CardItem>))
                }
            </div>
        </section>
    );
};

export default GalleryList;

