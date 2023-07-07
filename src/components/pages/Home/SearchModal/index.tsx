import { IToggle } from 'src/models/screens/Home';

const SearchModal = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    return (
        <div
            className={`search-content-wrap main-search-active ${
                props.isVisible ? 'search-visible' : ''
            }`}
        >
            <a
                className='search-close'
                onClick={props.closeHandler.bind(this, 'search')}
            >
                <i className=' ti-close '></i>
            </a>
            <div className='search-content'>
                <p>Start typing and press Enter to search</p>
                <form className='search-form' action='#'>
                    <input type='text' placeholder='Search' />
                    <button className='button-search'>
                        <i className='ti-search'></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchModal;
