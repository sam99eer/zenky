import { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 400);
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isVisible ? (
                <a id='scrollUp' onClick={handleClick}>
                    <i className=' ti-arrow-up'></i>
                </a>
            ) : null}
        </>
    );
};

export default ScrollToTop;
