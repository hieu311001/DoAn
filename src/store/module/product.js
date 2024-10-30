const state = {
    dataProducts: [{
            ProductID: 1,
            ProductName: 'Sản phẩm 1',
            Price: 100000,
            Sale: 10,
            TotalAmount: 200,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg',
            description: "<p>Được thiết kế từ chất liệu <strong>polyester</strong> siêu thoáng mát và thấm hút mồ hôi tốt.</p><p>Giúp ngăn ngừa bụi bặm khi đi xa cũng như giảm đáng kể mồ hôi dính vào lót mũ.</p><p>Đặc biệt mã sản phẩm <strong>MDL1919</strong> làm từ vải <em>coolmax</em> có độ thoáng mát tốt, tăng cảm giác thoải mái khi sử dụng.</p>"
        },
        {
            ProductID: 2,
            ProductName: 'Sản phẩm 2',
            Price: 200000,
            Sale: 0,
            TotalAmount: 240,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 3,
            ProductName: 'Sản phẩm 3',
            Price: 300000,
            Sale: 15,
            TotalAmount: 15,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 4,
            ProductName: 'Sản phẩm 4',
            Price: 400000,
            Sale: 0,
            TotalAmount: 0,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 5,
            ProductName: 'Sản phẩm 5',
            Price: 500000,
            Sale: 20,
            TotalAmount: 100,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 6,
            ProductName: 'Sản phẩm 6',
            Price: 600000,
            Sale: 0,
            TotalAmount: 100,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 7,
            ProductName: 'Sản phẩm 7',
            Price: 700000,
            Sale: 5,
            TotalAmount: 100,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 8,
            ProductName: 'Sản phẩm 8',
            Price: 800000,
            Sale: 0,
            TotalAmount: 400,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            ProductID: 8,
            ProductName: 'Sản phẩm 8',
            Price: 800000,
            Sale: 0,
            TotalAmount: 200,
            Image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
    ]
}

const mutations = {
    setDataProduct(state, payload) {
        state.dataProducts = payload;
    }
}

const actions = {
    setDataProduct(context, data) {
        context.commit("setDataProduct", data);
    }
}

export default {
    state,
    mutations,
    actions
}