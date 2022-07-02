"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../entity/customer"));
const order_1 = __importDefault(require("../entity/order"));
const order_item_1 = __importDefault(require("../entity/order_item"));
const order_service_1 = __importDefault(require("./order.service"));
describe('OrderService unit tests', () => {
    it('should throw error when place order with no items', () => {
        expect(() => {
            const customer = new customer_1.default("123", "John Doe");
            const order = order_service_1.default.placeOrder(customer, []);
        }).toThrowError('Order must have at least one item');
    });
    it('should place a order', () => {
        const customer = new customer_1.default("123", "John Doe");
        const item1 = new order_item_1.default("1", "Item 1", 100, "p1", 1);
        const item2 = new order_item_1.default("2", "Item 2", 150, "p2", 2);
        const order = order_service_1.default.placeOrder(customer, [item1, item2]);
        expect(customer.rewardPoints).toBe(200);
        expect(order.total()).toBe(400);
    });
    it('should calculate total of all orders', () => {
        const item1 = new order_item_1.default("1", "Item 1", 100, "p1", 1);
        const item2 = new order_item_1.default("2", "Item 2", 150, "p2", 2);
        const order1 = new order_1.default("123", "123", [item1]);
        const order2 = new order_1.default("1234", "123", [item2]);
        const total = order_service_1.default.total([order1, order2]);
        expect(total).toBe(400);
    });
});
