import {
    handleShowToast
} from "@/common/commonFn";
import {
    constants
} from "@/config";
import axios from "axios";

const state = {
    userInfo: null,
    users: null,
    userDetail: null
}

const mutations = {
    login(state, payload) {
        state.userInfo = payload;
    },

    logout(state) {
        state.userInfo = null;
    },

    getUserStaff(state, payload) {
        state.users = payload;
    },

    getUserByID(state, payload) {
        state.userDetail = payload;
    }
}

const actions = {
    /**
     * Đăng nhập
     * @param {*} context 
     */
    async login(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/User/login`, param)
            if (res.data) {
                context.commit("login", res.data);
                return true;
            }
        } catch (error) {
            handleShowToast(context, "Tài khoản hoặc mật khẩu không chính xác", 3);
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async logout(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/User/logout`)
            context.commit("logout")
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async updateUser(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/User`, param);
            handleShowToast(context, "Cập nhật thông tin thành công", 1)
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Đăng nhập
     * @param {*} context 
     */
    async getUserStaff(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/User/staff`)
            if (res.data) {
                context.commit("getUserStaff", res.data);
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
    async getUserByID(context, param) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/User/id?id=${param}`)
            if (res.data) {
                context.commit("getUserByID", res.data);
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
    async editUser(context, param) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/User`, param)
            if (res.data) {
                handleShowToast(context, "Cập nhật thông tin nhân viên thành công", 1)
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
    async addUser(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/User`, param)
            if (res.data) {
                handleShowToast(context, "Thêm nhân viên thành công", 1)
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
    async register(context, param) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/User`, param)
            if (res.data) {
                handleShowToast(context, "Đăng ký thành công", 1)
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
    async deleteUser(context, param) {
        try {
            const res = await axios.delete(`${constants.API_URL}/api/User`, {
                data: [param]
            })
            if (res.data) {
                handleShowToast(context, "Xóa nhân viên thành công", 1);
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