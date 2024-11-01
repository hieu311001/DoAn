import { createStore } from "vuex";
import main from "./module/main";
import sell from "./module/sell";
import product from "./module/product";
import productOrder from "./module/productOrder";

export default createStore({
    modules: {
        main,
        sell,
        product,
        productOrder
    }
})