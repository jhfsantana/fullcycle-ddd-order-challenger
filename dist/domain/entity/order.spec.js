"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            new order_1.default("", "123", []);
        }).toThrowError('Id is required');
    });
    it('should throw error when customer id is empty', () => {
        expect(() => {
            new order_1.default("123", "", []);
        }).toThrowError('Customer Id is required');
    });
    it('should throw error when items is empty', () => {
        expect(() => {
            new order_1.default("123", "123", []);
        }).toThrowError('Items is required');
    });
    it('should return total', () => {
        const customer = new customer_1.default("123", "John");
        const address = new address_1.default("Rua 1", 10, "21820-421", "RJ");
        customer.Address(address);
        const item1 = new order_item_1.default("1", "Item 1", 10, "p1", 2);
        const item2 = new order_item_1.default("2", "Item 2", 20, "p2", 2);
        const order = new order_1.default("123", "123", [item1, item2]);
        expect(order.total()).toBe(60);
    });
    it('should throw error when items quantity is less than 1', () => {
        expect(() => {
            const item1 = new order_item_1.default("1", "Item 1", 10, "p1", 0);
            const item2 = new order_item_1.default("2", "Item 2", 20, "p2", 2);
            const order = new order_1.default("123", "123", [item1, item2]);
        }).toThrowError('Items quantity must be greater than zero');
    });
});
