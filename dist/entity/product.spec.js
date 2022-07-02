"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            new product_1.default("", "Product 1", 10);
        }).toThrowError("Id is required");
    });
    it('should throw error when name is empty', () => {
        expect(() => {
            new product_1.default("123", "", 10);
        }).toThrowError("Name is required");
    });
    it('should throw error when price is less than zero', () => {
        expect(() => {
            new product_1.default("123", "Product 1", -1);
        }).toThrowError("Price must be positive");
    });
    it('should change name', () => {
        const product = new product_1.default("123", "Product 1", 10);
        product.changeName('Product 2');
        expect(product.name).toBe('Product 2');
    });
    it('should change price', () => {
        const product = new product_1.default("123", "Product 1", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });
});
