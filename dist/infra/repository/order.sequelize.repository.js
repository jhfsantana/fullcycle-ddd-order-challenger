"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../../domain/entity/order"));
const order_item_1 = __importDefault(require("../../domain/entity/order_item"));
const order_model_1 = __importDefault(require("../db/sequelize/model/order.model"));
const order_items_model_1 = __importDefault(require("../db/sequelize/model/order_items.model"));
class OrderSequelizeRepository {
    async create(entity) {
        await order_model_1.default.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            }))
        }, {
            include: [{ model: order_items_model_1.default }]
        });
    }
    async update(entity) {
        await order_items_model_1.default.destroy({ where: { orderId: entity.id } });
        await order_model_1.default.update({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total()
        }, {
            where: {
                id: entity.id,
            }
        });
        entity.items.map((item) => {
            order_items_model_1.default.create({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                orderId: entity.id
            });
        });
    }
    async find(id) {
        try {
            const ordermodel = await order_model_1.default.findOne({
                where: {
                    id: id,
                },
                include: ['items'], rejectOnEmpty: true
            });
            const orderItems = ordermodel.items.map((item) => {
                return new order_item_1.default(item.id, item.name, item.price / item.quantity, item.productId, item.quantity);
            });
            return new order_1.default(ordermodel.id, ordermodel.customerId, orderItems);
        }
        catch (error) {
            throw new Error(`Order ${id} not found`);
        }
    }
    async findAll() {
        const orderModels = await order_model_1.default.findAll({ include: ["items"] });
        const orders = orderModels.map((order) => {
            const orderItems = order.items.map((item) => {
                return new order_item_1.default(item.id, item.name, item.price / item.quantity, item.productId, item.quantity);
            });
            return new order_1.default(order.id, order.customerId, orderItems);
        });
        return orders;
    }
}
exports.default = OrderSequelizeRepository;
