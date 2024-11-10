import * as Enumeration from './enum/Enumeration.js';
import * as Resource from './resource/Resource.js'
// Các hàm dùng chung toàn chương trình

/**
 * Lấy giá trị của một enum
 * @param {*} data 
 * @param {*} resourceName 
 * @returns 
 * CreatedBy VMHieu 08/04/2023
 */
export function getValueEnum(data, enumName) {
    let enumeration = Enumeration[enumName],
        resource = Resource[enumName];

    for (const prop in enumeration) {
        if (enumeration[prop] == data) {
            data = resource[prop];
        }
    }

    return data;
}

/**
 * Chuyển đổi giá trị enum về giá trị trong csdl
 * @param {*} data 
 * @param {*} resourceName 
 * @returns 
 * CreatedBy VMHieu 08/04/2023
 */
export function getValueEnumBack(data, resourceName) {
    let enumeration = Enumeration[resourceName],
        resource = Resource[resourceName];

    for (const prop in resource) {
        if (resource[prop] == data) {
            data = enumeration[prop];
        }
    }

    return data;
}

export function formatDate(date) {
    if (!date) {
        return;
    }

    if (!(date instanceof Date)) {
        let dateClone = new Date(date);

        if (!isNaN(dateClone.getTime())) {
            date = dateClone;
        }
    }

    if (isNaN(date.getTime())) {
        return;
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        const random = Math.random() * 16 | 0;
        const value = char === 'x' ? random : (random & 0x3 | 0x8);
        return value.toString(16);
    });
}

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Trả về null nếu không tìm thấy cookie
}

export function handleShowToast(context, msg, status) {
    context.commit('updateToastStatus', status);
    context.commit('updateToastMsg', msg);
    context.commit('showToast', true);
    setTimeout(() => {
        context.commit('showToast', false);
    }, 2000);
    context.commit("showLoading", false);
}

export function showToastWarning(store, msg){
    store.dispatch("showToast", true);
    store.dispatch("updateToastStatus", Enumeration.ToastStatus.Warning);
    store.dispatch("updateToastMsg", msg);
}