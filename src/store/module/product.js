import { constants } from "@/config";
import axios from "axios";

const state = {
    dataProducts: [],
    dataProductDetail: {}
}

const mutations = {
    getAllProduct(state, payload) {
        state.dataProducts = payload;
    },

    getProductByID(state, payload) {
        state.dataProductDetail = payload;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
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
     * CreatedBy VMHieu 28/03/2023
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
}

export default {
    state,
    mutations,
    actions
}