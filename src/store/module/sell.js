import { constants } from "@/config";
import axios from "axios";

const state = {
    dataSell: []
}

const mutations = {
    getAllProductSell(state, payload) {
        state.dataSell = payload;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async getAllProductSell(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/Product/get-all/${param}`)
            if(res.data) {
                context.commit("getAllProductSell", res.data)
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