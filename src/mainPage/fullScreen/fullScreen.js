import './fullScreen.css';

import { RxCross2 } from 'react-icons/rx';
import { AiOutlineHeart } from 'react-icons/ai';

const FullScreen = (props) => {
    return (
        <div className="fullScreen">
            <div className="imageInfo">
                <RxCross2 className='cross' onClick={() => props.setFullScreen(null)} />
                <img className='image' src={props.image.split('?')[0]} alt="" />

                <div className="fullSizeBottom">
                    <div className="fullSizeLeft">
                        <img className='photographerImage' src="https://images.pexels.com/users/avatars/680589/joey-farina-816.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1" alt="" />
                        <div className="photoInfo">
                            <h3>Joey F</h3>
                            <h2>Brown Rocks During Golden Hour</h2>
                        </div>
                    </div>
                    <div className="fullSizeRight">
                        <a href="#/" className='likes'>500<AiOutlineHeart /></a>
                    </div>
                </div>
            </div>
        </div>
    );

};


export default FullScreen;

