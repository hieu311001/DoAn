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

    getStorageOrderDetail(state, payload) {
        state.dataStorageOrderDetail = payload;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async createStoreOrder(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/StorageOrder/store-order`, param)
            if (res.data) {
                alert("Thêm yêu cầu thành công");
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
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
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
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
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async updateStorageOrder(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/StorageOrder`, param)
            if (res.data) {
                alert("Cập nhật yêu cầu thành công")
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async acceptStorageOrder(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/StorageOrder/accept`, param)
            if (res.data) {
                alert("Cập nhật yêu cầu thành công")
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