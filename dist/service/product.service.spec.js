"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../entity/product"));
const product_service_1 = __importDefault(require("./product.service"));
describe('ProductService unit tests', () => {
    it('should increase all products price by percentage', () => {
        const product1 = new product_1.default("1", "Product 1", 100);
        const product2 = new product_1.default("2", "Product 2", 50);
        const product3 = new product_1.default("3", "Product 3", 110);
        product_service_1.default.increasePrice([product1, product2, product3], 100);
        expect(product1.price).toBe(200);
        expect(product2.price).toBe(100);
        expect(product3.price).toBe(220);
    });
});
