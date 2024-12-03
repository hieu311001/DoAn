import { handleShowToast } from "@/common/commonFn";
import { constants } from "@/config";
import axios from "axios";

const state = {
    dataProducts: [],
    dataProductReport: [],
    dataProductDetail: {}
}

const mutations = {
    getAllProduct(state, payload) {
        state.dataProducts = payload;
    },

    getProductByID(state, payload) {
        state.dataProductDetail = payload;
    },

    getProductByProductOrder(state, payload) {
        state.dataProductReport = payload;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async getAllProduct(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/Product/get-all/${param}`)
            if (res.data) {
                context.commit("getAllProduct", res.data)
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async getProductByProductOrder(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/Product/get-report`, param)
            if (res.data) {
                context.commit("getProductByProductOrder", res.data)
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async getProductReportByStorageOrder(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/Product/get-report-storage`, param)
            if (res.data) {
                context.commit("getProductByProductOrder", res.data)
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async getProductByID(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/Product/id?id=${param}`)
            if (res.data) {
                context.commit("getProductByID", res.data)
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async deleteProductByID(context, param) {
        try {
            const res = await axios.delete(`${constants.API_URL}/api/Product`, {
                data: [param]
            })
            if (res.data) {
                handleShowToast(context, "Xóa sản phẩm thành công", 1);
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async updateProduct(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/Product`, param)
            if (res.data) {
                handleShowToast(context, "Cập nhật thông tin sản phẩm thành công", 1);
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     */
    async addProduct(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/Product`, param)
            if (res.data) {
                handleShowToast(context, "Thêm sản phẩm thành công", 1);
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