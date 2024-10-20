const state = {
    dataSell: [{
            id: 1,
            name: 'Sản phẩm 1',
            price: 100000,
            discount: 10,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg',
            description: "<p>Được thiết kế từ chất liệu <strong>polyester</strong> siêu thoáng mát và thấm hút mồ hôi tốt.</p><p>Giúp ngăn ngừa bụi bặm khi đi xa cũng như giảm đáng kể mồ hôi dính vào lót mũ.</p><p>Đặc biệt mã sản phẩm <strong>MDL1919</strong> làm từ vải <em>coolmax</em> có độ thoáng mát tốt, tăng cảm giác thoải mái khi sử dụng.</p>"
        },
        {
            id: 2,
            name: 'Sản phẩm 2',
            price: 200000,
            discount: 0,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 3,
            name: 'Sản phẩm 3',
            price: 300000,
            discount: 15,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 4,
            name: 'Sản phẩm 4',
            price: 400000,
            discount: 0,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 5,
            name: 'Sản phẩm 5',
            price: 500000,
            discount: 20,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 6,
            name: 'Sản phẩm 6',
            price: 600000,
            discount: 0,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 7,
            name: 'Sản phẩm 7',
            price: 700000,
            discount: 5,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 8,
            name: 'Sản phẩm 8',
            price: 800000,
            discount: 0,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
        {
            id: 8,
            name: 'Sản phẩm 8',
            price: 800000,
            discount: 0,
            image: 'https://phuotbuistore.com/wp-content/uploads/2024/03/khan-trum-dau-ninja-motowolf-1919-1-300x300.jpg'
        },
    ]
}

const mutations = {
    setDataCell(state, payload) {
        state.dataSell = payload;
    }
}

const actions = {
    setDataCell(context, data) {
        context.commit("setDataCell", data);
    }
}

export default {
    state,
    mutations,
    actions
}