
// Các resource dùng chung toàn chương trình
var Resource = Resource || {};

export const PaymentMethod = {
    Receive: "Thanh toán khi nhận hàng",
    Online: "Thanh toán online"
}

export const FilterOperatorEnum = {
    Equal: 1,
    NotEqual: 2,
    GreaterThan: 3,
    GreaterThanOrEqual: 4,
    LessThan: 5,
    LessThanOrEqual: 6,
    IsNull: 7,
    IsNotNull: 8,
    StartWith: 9,
    EndWith: 10,
    Contains: 11,
}

export const ProductOrderStatus = {
    Processing: "Đang xử lý",
    Incoming: "Đang giao hàng",
    Done: "Đã hoàn thành",
    Cancel: "Đã hủy"
}

export const Role = {
    Admin: 0,
    Staff: 1,
    StorageStaff: 2,
    Customer: 3,
}

export const StorageOrderStatus = {
    Processing: "Đang xử lý",
    Done: "Đã xử lý",
    Cancel: "Đã hủy"
}

export default Resource;