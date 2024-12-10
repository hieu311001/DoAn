import { handleShowToast } from "@/common/commonFn";
import {
    constants
} from "@/config";
import axios from "axios";

const state = {
    storeInfo: null,
    storeReportInfo: null,
    storageReportInfo: null,
    storeDetail: null
}

const mutations = {
    getStore(state, payload) {
        payload.forEach(item => {
            item.StoreText = item.StoreName + ' - ' + item.Address;
        })
        state.storeInfo = payload;
    },

    getStoreReport(state, payload) {
        payload.forEach(item => {
            item.StoreText = item.StoreName + ' - ' + item.Address;
        })
        state.storeReportInfo = payload;
    },

    getStorageReport(state, payload) {
        payload.forEach(item => {
            item.StoreText = item.StoreName + ' - ' + item.Address;
        })
        state.storageReportInfo = payload;
    },

    getStoreByID(state, payload) {
        state.storeDetail = payload;
    }
}

const actions = {
    /**
     * Đăng nhập
     * @param {*} context 
     */
    async getStore(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/store`)
            if (res.data) {
                context.commit("getStore", res.data);
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async getStoreReport(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/store/get-report`, param)
            if (res.data) {
                context.commit("getStoreReport", res.data);
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async getStorageReport(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/store/get-report-storage`, param)
            if (res.data) {
                context.commit("getStorageReport", res.data);
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async getStoreByID(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/store/id?id=${param}`)
            if (res.data) {
                context.commit("getStoreByID", res.data);
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async editStore(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/Store`, param)
            if (res.data) {
                handleShowToast(context, "Cập nhật thông tin cửa hàng thành công", 1)
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async addStore(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/Store`, param)
            if (res.data) {
                handleShowToast(context, "Thêm cửa hàng thành công", 1)
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async deleteStore(context, param) {
        try {
            const res = await axios.delete(`${constants.API_URL}/api/Store`, {
                data: [param]
            })
            if (res.data) {
                handleShowToast(context, "Xóa cửa hàng thành công", 1);
            }
        } catch (error) {
            console.log(error);
        }
    },
}

export default {
    state,
    mutations,
    actions
}