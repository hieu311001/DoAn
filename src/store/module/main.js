
const state = {

}

const mutations = {
   
}

const actions = {
    showPopup(context, data) {
        context.commit('openModal', data);
    },

    closePopup(context) {
        context.commit('closeModal');
    },
}

export default {
    state,
    mutations,
    actions
}