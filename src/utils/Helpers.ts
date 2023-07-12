import { IKeyValue, IKeyValueRegex } from 'src/models/data/KeyValue';

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
