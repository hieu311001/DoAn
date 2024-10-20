import { createStore } from "vuex";
import main from "./module/main";
import sell from "./module/sell";

export default createStore({
    modules: {
        main,
        sell
    }
})