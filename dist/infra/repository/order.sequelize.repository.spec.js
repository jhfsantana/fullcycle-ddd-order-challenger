"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const address_1 = __importDefault(require("../../domain/entity/address"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const order_1 = __importDefault(require("../../domain/entity/order"));
const order_item_1 = __importDefault(require("../../domain/entity/order_item"));
const product_1 = __importDefault(require("../../domain/entity/product"));
const customer_model_1 = __importDefault(require("../db/sequelize/model/customer.model"));
const order_model_1 = __importDefault(require("../db/sequelize/model/order.model"));
const order_items_model_1 = __importDefault(require("../db/sequelize/model/order_items.model"));
const product_model_1 = __importDefault(require("../db/sequelize/model/product.model"));
const customer_sequelize_repository_1 = __importDefault(require("./customer.sequelize.repository"));
const order_sequelize_repository_1 = __importDefault(require("./order.sequelize.repository"));
const product_sequelize_repository_1 = __importDefault(require("./product.sequelize.repository"));
describe('Order Repository Tests', () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([customer_model_1.default, order_model_1.default, order_items_model_1.default, product_model_1.default]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it('should create a new order', async () => {
        const customerRepository = new customer_sequelize_repository_1.default();
        const customer = new customer_1.default("123", "John Doe");
        const address = new address_1.default("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);
        await customerRepository.create(customer);
        const product = new product_1.default("111", "Celular", 5000);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 1);
        const order = new order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_sequelize_repository_1.default();
        await orderRepository.create(order);
        const orderModel = await order_model_1.default.findOne({ where: { id: order.id }, include: ["items"] });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    orderId: "123",
                    productId: orderItem.productId
                }
            ]
        });
    });
    it('should update a order', async () => {
        const customerRepository = new customer_sequelize_repository_1.default();
        const customer = new customer_1.default("123", "John Doe");
        const address = new address_1.default("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);
        await customerRepository.create(customer);
        const product = new product_1.default("111", "Celular", 5000);
        const product2 = new product_1.default("2", "Camisa", 50);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        await productRepository.create(product2);
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 1);
        const order = new order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_sequelize_repository_1.default();
        await orderRepository.create(order);
        const orderItem2 = new order_item_1.default("2", product2.name, product2.price, product2.id, 1);
        order.addItem(orderItem2);
        await orderRepository.update(order);
        const orderModel = await order_model_1.default.findOne({ where: { id: order.id }, include: ["items"] });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    orderId: "123",
                    productId: orderItem.productId
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    orderId: "123",
                    productId: orderItem2.productId
                }
            ]
        });
    });
    it('should find a order', async () => {
        const customerRepository = new customer_sequelize_repository_1.default();
        const customer = new customer_1.default("123", "John Doe");
        const address = new address_1.default("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);
        await customerRepository.create(customer);
        const product = new product_1.default("111", "Celular", 5000);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 1);
        const order = new order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_sequelize_repository_1.default();
        await orderRepository.create(order);
        const orderModel = await order_model_1.default.findOne({ where: { id: order.id }, include: ["items"] });
        const orderFind = await orderRepository.find("123");
        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFind.id,
            customerId: orderFind.customerId,
            total: orderFind.total(),
            items: [
                {
                    id: orderFind.items[0].id,
                    name: orderFind.items[0].name,
                    quantity: orderFind.items[0].quantity,
                    price: orderFind.items[0].price,
                    orderId: orderFind.id,
                    productId: orderFind.items[0].productId
                }
            ]
        });
    });
    it('should throw error when not found order', async () => {
        const id = "ID_NOT_EXISTS";
        expect(async () => {
            await new order_sequelize_repository_1.default().find(id);
        }).rejects.toThrow(`Order ${id} not found`);
    });
    it('should find all orders', async () => {
        const customerRepository = new customer_sequelize_repository_1.default();
        const customer = new customer_1.default("123", "John Doe");
        const address = new address_1.default("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);
        await customerRepository.create(customer);
        const product = new product_1.default("111", "Celular", 5000);
        const product2 = new product_1.default("2", "Camisa", 50);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        await productRepository.create(product2);
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const orderItem2 = new order_item_1.default("2", product2.name, product2.price, product2.id, 13);
        const order = new order_1.default("1", "123", [orderItem]);
        order.total();
        const order2 = new order_1.default("2", "123", [orderItem2]);
        order2.total();
        const orderRepository = new order_sequelize_repository_1.default();
        await orderRepository.create(order);
        await orderRepository.create(order2);
        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(2);
        expect(orders[0]).toEqual(order);
        expect(orders[1]).toEqual(order2);
    });
});
