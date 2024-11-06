import { constants } from "@/config";
import axios from "axios";

const state = {
    dataProductOrders: [],
    dataProductOrderDetail: {},
}

const mutations = {
    getOrder(state, payload) {
        state.dataProductOrders = payload;
    },

    getOrderDetail(state, payload) {
        state.dataProductOrderDetail = payload;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async createOrder(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/ProductOrder/order`, param)
            if(res.data) {
                alert("Thêm đơn hàng thành công");
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
    async getOrder(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/ProductOrder/get-all/${param}`)
            if(res.data) {
                context.commit("getOrder", res.data);
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
    async getOrderDetail(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/ProductOrder/get-detail/${param}`)
            if(res.data) {
                context.commit("getOrderDetail", res.data);
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
    async updateOrder(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/ProductOrder`, param)
            if(res.data) {
                alert("Cập nhật trạng thái đơn hàng thành công")
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