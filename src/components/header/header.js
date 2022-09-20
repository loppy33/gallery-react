import './header.css';

const Header = (props) => {

    return(
        <div className='header'>
            <button className='headerFavorites'>Только избраное</button>
            <button className='headerAdd' onClick={() => props.setModal(true)}>Добавить фото</button>
        </div>
    );
};

export default Header;