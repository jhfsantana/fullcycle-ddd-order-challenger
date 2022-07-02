"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new customer_1.default("", "John");
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it("should change customer", () => {
        const customer = new customer_1.default("123", "John");
        customer.changeName("John Doe");
        expect(customer.name).toBe("John Doe");
    });
    it("should throw error when trying activate user without address", () => {
        expect(() => {
            const customer = new customer_1.default("123", "John");
            customer.activate();
        }).toThrowError('Address is required to active a customer');
    });
    it("should active a customer", () => {
        const customer = new customer_1.default("123", "John");
        const address = new address_1.default("Rua Rio da Prata", 10, '21820-097', 'Rio de Janeiro');
        customer.Address(address);
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should deactive a customer", () => {
        const customer = new customer_1.default("123", "John");
        const address = new address_1.default("Rua Rio da Prata", 10, '21820-097', 'Rio de Janeiro');
        customer.Address(address);
        customer.activate();
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
    it('should add rewards points', () => {
        const customer = new customer_1.default("id", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardsPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardsPoints(53);
        expect(customer.rewardPoints).toBe(63);
    });
});
