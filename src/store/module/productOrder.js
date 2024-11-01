const state = {
    dataProductOrders: [{
            ProductOrderID: 1,
            ProductName: 'Sản phẩm 1',
            FullName: "Nguyễn Văn A",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 20000000,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        },
        {
            ProductOrderID: 2,
            ProductName: 'Sản phẩm 2',
            FullName: "Nguyễn Văn A2",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalAmount: 30000000,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 3,
            ProductName: 'Sản phẩm 3',
            FullName: "Nguyễn Văn A3",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalAmount: 4000000,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 4,
            ProductName: 'Sản phẩm 4',
            FullName: "Nguyễn Văn A4",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 12312312,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 5,
            ProductName: 'Sản phẩm 5',
            FullName: "Nguyễn Văn A5",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 3453453,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 6,
            ProductName: 'Sản phẩm 6',
            FullName: "Nguyễn Văn 6",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 11111111,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 7,
            ProductName: 'Sản phẩm 7',
            FullName: "Nguyễn Văn A7",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 22222222,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }, {
            ProductOrderID: 8,
            ProductName: 'Sản phẩm 8',
            FullName: "Nguyễn Văn A8",
            PhoneNumber: "01234567**",
            Address: "Đường 123",
            TotalPrice: 100000,
            TotalAmount: 33333333,
            PaymentMethod: 0,
            OrderDate: new Date(),
            Status: 0
        }
    ]
}

const mutations = {
    setDataProductOrder(state, payload) {
        state.dataProductOrders = payload;
    }
}

const actions = {
    setDataProductOrder(context, data) {
        context.commit("setDataProductOrder", data);
    }
}

export default {
    state,
    mutations,
    actions
}