import { createStore } from "vuex";
import main from "./module/main";
import sell from "./module/sell";
import product from "./module/product";
import productOrder from "./module/productOrder";
import productStore from "./module/productStore";
import storageOrder from "./module/storageOrder";
import user from "./module/user";
import stores from "./module/stores";
import app from "./module/app";

export default createStore({
    modules: {
        main,
        sell,
        product,
        productOrder,
        productStore,
        storageOrder,
        user,
        stores,
        app
    }
})