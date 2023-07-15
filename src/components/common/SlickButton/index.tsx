import React from 'react';
import { SlickArrowProps } from 'src/models/data/CustomSlickModel';

const SlickButton: React.FC<SlickArrowProps | any> = ({
    currentSlide,
    slideCount,
    customClass,
    children,
    ...props
}: SlickArrowProps) => {
    return (
        <>
            <span
                {...props}
                className={`${props?.className} ${
                    customClass ? customClass : ''
                }`}
            >
                {children}
            </span>
        </>
    );
};

export default SlickButton;
