import { ITestimonial } from 'src/models/data/TestimonialModel';
import NishykaImg from '/assets/images/Nishyka.jpg';
import RajeshImg from '/assets/images/Rajesh.jpg';
import ShreyaImg from '/assets/images/Shreya.jpg';
import DeepImg from '/assets/images/Deep.jpg';
import ShaliniImg from '/assets/images/Shalini.jpg';

export const TESTIMONIAL_DATA: ITestimonial[] = [
    {
        username: 'Nishyka',
        designation: 'Customer',
        image: NishykaImg,
        review: `This Zenky T-shirt is very light, fairly in summer to wear that will be awesome for the sports or casual . The fabric is very soft as it is pure cotton . It’s nice and snuggly! I can’t wait for it to get cool enough to wear it!`,
    },
    {
        username: 'Rajesh',
        designation: 'Customer',
        image: RajeshImg,
        review: `These are the best Cotton t-shirt ever!! I have several pairs in different colors & LOVE them!! They’re super soft & the colored fashionable do not look like heavy at all. Very figure flattering with just the right amount of stretch.`,
    },
    {
        username: 'Shreya',
        designation: 'Customer',
        image: ShreyaImg,
        review: `Excellent shirt! Very comfortable and it has a soft lining which keeps you cool. Great shirt, i wear it almost daily. It’s not water-proof so keep that in mind when outside. Also, get 1 size bigger so when it shrinks, it’ll still fit.`,
    },
    {
        username: 'Deep Saundh',
        designation: 'Customer',
        image: DeepImg,
        review: `Perfect & Plenty We needed 105 shirts for an event and The yoga camp T-Shirt Company was able to fulfill our order and get them to us in a timely manner.`,
    },
    {
        username: 'Shalini',
        designation: 'Customer',
        image: ShaliniImg,
        review: `Recently bought 3 classic white T-shirts - one, V-neck, short sleeve; one, V-neck, long sleeve; and one, crew neck, long sleeve. Loved them all and really appreciated the solid density of the fabric and its smooth finish.`,
    },
];
