import { IKeyValue, IKeyValueRegex } from 'src/models/data/KeyValue';
import { CONSTANTS } from 'src/utils/Constants';

export const checkEmpty = (data: IKeyValue[]) => {
    let msg = '';
    let flag = false;

    for (let item of data) {
        if (item.value.toString().trim() === '') {
            flag = true;
            msg += `${item.key}, `;
        }
    }

    if (flag) {
        msg = msg.substring(0, msg.length - 2);
        msg += ' required to complete the checkout';
    }

    return msg;
};

export const checkRegex = (data: IKeyValueRegex[]) => {
    let msg = '';
    let flag = false;

    for (let item of data) {
        if (!item.value.match(item.regex)) {
            flag = true;
            msg += `${item.key}, `;
        }
    }

    if (flag) {
        msg = 'Invalid ' + msg.substring(0, msg.length - 2);
    }

    return msg;
};

export const formatServerImagePath = (imageName: string) => {
    return `${CONSTANTS.HOST}${CONSTANTS.IMG_PATH}${imageName}`;
};

export const formatServerTimestamp = (time: string) => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    return formattedDate;
};

export const setCookie = (
    name: string,
    value: string,
    daysToExpire: number
) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 86400000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie =
        name + '=' + value + '; ' + expires + '; path=/; secure=true;';
};

export const getCookie = (name: string) => {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }

    return null;
};

export const deleteCookie = (name: string) => {
    document.cookie =
        name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure=true;';
};

export const checkScript = (srcToCheck: string) => {
    const scripts = document.body.getElementsByTagName('script');

    let hasScript = false;

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === srcToCheck) {
            hasScript = true;
            break;
        }
    }

    return hasScript;
};

export const loadScript = (src: string) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};
