import { PropsWithChildren } from 'react';
import { CustomArrowProps } from 'react-slick';

export interface SlickArrowProps extends PropsWithChildren<CustomArrowProps> {
    currentSlide: number;
    slideCount: number;
    customClass?: string;
}
