"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../../../domain/entity/product"));
const product_model_1 = __importDefault(require("./product.model"));
class ProductSequelizeRepository {
    async create(entity) {
        await product_model_1.default.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }
    async update(entity) {
        await product_model_1.default.update({
            id: entity.id,
            name: entity.name,
            price: entity.price
        }, {
            where: {
                id: entity.id
            }
        });
    }
    async find(id) {
        const product = await product_model_1.default.findOne({
            where: {
                id: id
            }
        });
        return new product_1.default(product.id, product.name, product.price);
    }
    async findAll() {
        return (await product_model_1.default.findAll())
            .map((product) => new product_1.default(product.id, product.name, product.price));
    }
}
exports.default = ProductSequelizeRepository;
