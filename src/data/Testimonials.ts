import { ITestimonial } from 'src/models/data/TestimonialModel';
import Avatar1 from '/assets/images/avatar-1.png';
import Avatar2 from '/assets/images/avatar-2.png';

export const TESTIMONIAL_DATA: ITestimonial[] = [
    {
        username: 'Karan',
        designation: 'Designer',
        image: Avatar1,
        review: `I can't say enough good things about the zenky.
        Their trendy and unique t-shirt designs never
        fail to impress me and draw compliments wherever
        I go. The customer service is top-notch,
        ensuring a delightful shopping experience every
        time. This is definitely my go-to destination
        for stylish t-shirts!`,
    },
    {
        username: 'Shubham',
        designation: 'Customer',
        image: Avatar2,
        review: `I am absolutely thrilled with my experience at
        the zenky. The quality of their t-shirts is
        exceptional, and their extensive collection
        offers something for everyone. The seamless
        ordering process and prompt delivery have made
        me a loyal customer. Highly recommend!`,
    },
];
