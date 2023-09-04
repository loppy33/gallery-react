import './fullScreen.css';

import { RxCross2 } from 'react-icons/rx';

const FullScreen = (props) => {
    return (
        <div className="fullScreen">
            <div className="imageInfo">
                <RxCross2 className='cross'/>
                <img className='image' src="https://images.pexels.com/photos/4737484/pexels-photo-4737484.jpeg" alt="" />
                <h3>Name Phtograph</h3>
                <h2>Brown Rocks During Golden Hour</h2>
                <img className='photographerImage' src="https://images.pexels.com/users/avatars/680589/joey-farina-816.jpeg" alt="" />
            </div>
        </div>
    );

};


export default FullScreen;

