const state = {
    dataProductStores: [{
        StorageOrderID: 1,
        StoreName: 'Cửa hàng A',
        CreateDate: new Date(),
        Status: 0
    }],
    dataProductStoreDetail: {
        StorageOrderID: 1,
        StoreName: 'Cửa hàng A',
        CreateDate: new Date(),
        Status: 0,
        Products: [{
            ProductID: 1,
            ProductName: 'Sản phẩm 1',
            Amount: 50,
            TotalAmount: 100,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg',
        },
        {
            ProductID: 2,
            ProductName: 'Sản phẩm 2',
            Amount: 100,
            TotalAmount: 100,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg',
        },
        {
            ProductID: 3,
            ProductName: 'Sản phẩm 3',
            Amount: 200,
            TotalAmount: 100,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg',
        }]
    }
}

const mutations = {
    setDataProductStore(state, payload) {
        state.dataProductStores = payload;
    }
}

const actions = {
    setDataProductStore(context, data) {
        context.commit("setDataProductStore", data);
    }
}

export default {
    state,
    mutations,
    actions
}