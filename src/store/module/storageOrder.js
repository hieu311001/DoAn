import { handleShowToast } from "@/common/commonFn";
import {
    constants
} from "@/config";
import axios from "axios";

const state = {
    dataStorageOrders: [],
    dataStorageOrderDetail: {}
}

const mutations = {
    getAllStorageOrder(state, payload) {
        state.dataStorageOrders = payload;
    },

    getAllStorageOrderByStorage(state, payload) {
        state.dataStorageOrders = payload;
    },

    getStorageOrderDetail(state, payload) {
        state.dataStorageOrderDetail = payload;
    }
}

const actions = {
    /**
     * 
     * @param {*} context 
     */
    async createStoreOrder(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/StorageOrder/store-order`, param)
            if (res.data) {
                handleShowToast(context, "Thêm yêu cầu thành công", 1);
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * 
     * @param {*} context 
     */
    async createStoreOrderByStorage(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/StorageOrder/store-order-storage`, param)
            if (res.data) {
                handleShowToast(context, "Thêm yêu cầu thành công", 1);
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * 
     * @param {*} context 
     */
    async getAllStorageOrder(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/StorageOrder`)
            if (res.data) {
                context.commit("getAllStorageOrder", res.data)
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * 
     * @param {*} context 
     */
    async getAllStorageOrderByStorage(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/StorageOrder/${param}`)
            if (res.data) {
                context.commit("getAllStorageOrderByStorage", res.data)
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     *
     * @param {*} context 
     */
    async getStorageOrderDetail(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/StorageOrder/get-detail/${param}`)
            if (res.data) {
                context.commit("getStorageOrderDetail", res.data);
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     *
     * @param {*} context 
     */
    async updateStorageOrder(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/StorageOrder`, param)
            if (res.data) {
                handleShowToast(context, "Cập nhật yêu cầu thành công", 1);
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * 
     * @param {*} context 
     */
    async acceptStorageOrder(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/StorageOrder/accept`, param)
            if (res.data) {
                handleShowToast(context, "Cập nhật yêu cầu thành công", 1);
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