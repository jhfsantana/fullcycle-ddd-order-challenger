"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = __importDefault(require("../../domain/entity/product"));
const product_model_1 = __importDefault(require("../db/sequelize/model/product.model"));
const product_sequelize_repository_1 = __importDefault(require("./product.sequelize.repository"));
describe('Product Repository Tests', () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([product_model_1.default]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it('should create a product', async () => {
        const product = new product_1.default("1", "Product 1", 100);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        const productFound = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productFound.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
    it('should update a product', async () => {
        const product = new product_1.default("1", "Product 1", 100);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        product.changeName('Product Updated');
        product.changePrice(50);
        await productRepository.update(product);
        const productFound = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productFound.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
    it('should find a product', async () => {
        const product = new product_1.default("1", "Product 1", 100);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        const productFound = await productRepository.find("1");
        expect(productFound).toEqual(product);
    });
    it('should find all products', async () => {
        const product = new product_1.default("1", "Product 1", 100);
        const product2 = new product_1.default("2", "Product 2", 100);
        const productRepository = new product_sequelize_repository_1.default();
        await productRepository.create(product);
        await productRepository.create(product2);
        const products = await productRepository.findAll();
        expect(products).toEqual([product, product2]);
    });
});
