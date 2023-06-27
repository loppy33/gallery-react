import './addPics.css';
import { useRef } from 'react';

const AddPics = (props) => {
    const inputRef = useRef(null);
    return (
        <div className="modal">
            <div className="modalBody">
                <h2 className="modalTitle">Добавить новое фото</h2>
                <p className="modalText">Добавьте url ссылку на картинку</p>
                <input ref={inputRef} type="text" className="modalinput" placeholder="url" />
                <div>
                    <button className="modalCancel" onClick={() => props.setModal(false)}>Отмена</button>
                    <button className="modalAdd" onClick={() => {
                        props.handleCards(inputRef.current.value)
                        props.setModal(false)
                    }
                    }>Добавить</button>
                </div>
            </div>
        </div>
    );

};


export default AddPics;

