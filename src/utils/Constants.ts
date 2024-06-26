export const CONSTANTS = {
    HOST: 'https://api.thezenky.com/',
    IMG_PATH: 'uploads/',
    API_VERSION: 'api/user/',
    RAZORPAY_SCRIPT: 'https://checkout.razorpay.com/v1/checkout.js',
};

export const REGEX = {
    PHONE: /^\d{10}$/,
    EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/,
    EMAIL_OR_PHONE: /^\d{10}$|^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/,
    ZIP: /^\d{6}$/,
    OTP: /^\d{6}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
    TRACK_NUMBER: /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/,
};

export const WISHLIST_MSG = {
    ADDED: 'Product added to wishlist successfully',
    REMOVED: 'Product removed from wishlist successfully',
};
