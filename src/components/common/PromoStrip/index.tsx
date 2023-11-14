import { MouseEventHandler } from 'react';

const PromoStrip = () => {
    const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
        const marqueeContainer = document.querySelector(
            '.marquee-container'
        ) as HTMLDivElement;
        if (marqueeContainer) {
            marqueeContainer.style.animationPlayState = 'paused';
        }
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
        const marqueeContainer = document.querySelector(
            '.marquee-container'
        ) as HTMLDivElement;
        if (marqueeContainer) {
            marqueeContainer.style.animationPlayState = 'running';
        }
    };

    return (
        <div
            className='header-marquee'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='marquee-container'>
                Currently Accepting only COD Order
            </div>
        </div>
    );
};

export default PromoStrip;
