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
