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