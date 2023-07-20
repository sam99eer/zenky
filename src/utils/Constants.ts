export const CONSTANTS = {
    HOST: 'https://api.thezenky.com/',
    IMG_PATH: 'uploads/',
    API_VERSION: 'api/user/',
};

export const REGEX = {
    PHONE: /^\d{10}$/,
    EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/,
    ZIP: /^\d{6}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
};

export const WISHLIST_MSG = {
    ADDED: 'Product added to wishlist successfully',
    REMOVED: 'Product removed from wishlist successfully',
};
