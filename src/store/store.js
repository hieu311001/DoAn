import { createStore } from "vuex";
import main from "./module/main";
import sell from "./module/sell";
import product from "./module/product";

export default createStore({
    modules: {
        main,
        sell,
        product
    }
})