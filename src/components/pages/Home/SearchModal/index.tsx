import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IToggle } from 'src/models/screens/Home';
import { Screens } from 'src/utils/Screens';

const SearchModal = (props: {
    isVisible: boolean;
    closeHandler: (uid: keyof IToggle) => void;
}) => {
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const formHandler = (event: FormEvent) => {
        event.preventDefault();

        if (search.trim().length < 3) return;

        navigate(Screens.SHOP, { state: { search } });
    };

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
                <form className='search-form' onSubmit={formHandler}>
                    <input
                        type='text'
                        placeholder='Search (min 3 characters)'
                        value={search}
                        onChange={searchHandler}
                        minLength={3}
                    />
                    <button className='button-search'>
                        <i className='ti-search'></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchModal;
