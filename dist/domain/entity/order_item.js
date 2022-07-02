"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
    }
    get id() {
        return this._id;
    }
    get price() {
        return this._price * this._quantity;
    }
    get quantity() {
        return this._quantity;
    }
    get name() {
        return this._name;
    }
    get productId() {
        return this._productId;
    }
}
exports.default = OrderItem;
