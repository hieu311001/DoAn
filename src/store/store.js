import { createStore } from "vuex";
import main from "./module/main";
import sell from "./module/sell";
import product from "./module/product";
import productOrder from "./module/productOrder";
import productStore from "./module/productStore";
import storageOrder from "./module/storageOrder";

export default createStore({
    modules: {
        main,
        sell,
        product,
        productOrder,
        productStore,
        storageOrder
    }
})