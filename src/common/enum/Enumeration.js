// Các enum dùng chung toàn chương trình
var Enumeration = Enumeration || {};

export const PaymentMethod = {
    Receive: 0,
    Online: 1
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
    Processing: 0,
    Incoming: 1,
    Done: 2,
    Cancel: 3
}

export const Role = {
    Admin: 0,
    Staff: 1,
    StorageStaff: 2,
    Customer: 3,
}

export const StorageOrderStatus = {
    Processing: 0,
    Done: 1,
}

export default Enumeration;