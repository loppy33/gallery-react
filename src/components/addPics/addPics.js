import './addPics.css';

const AddPics = (props) => {

    return (
        <div className="modal">
            <div className="modalBody">
                <h2 className="modalTitle">Добавить новое фото</h2>
                <p className="modalText">Добавьте url ссылку на картинку</p>
                <input type="text" className="modalinput" placeholder="url" />
                <div>
                    <button className="modalCancel" onClick={() => props.setModal(false)}>Отмена</button>
                    <button className="modalAdd">Добавить</button>
                </div>
            </div>
        </div>
    );

};


export default AddPics;

// TODO При нажатии на кнопку отмена на модал окне закрыть модал окно