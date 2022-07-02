"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../../domain/entity/address"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const customer_model_1 = __importDefault(require("../db/sequelize/model/customer.model"));
class CustomerSequelizeRepository {
    async create(entity) {
        await customer_model_1.default.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            street: entity.address.street,
            city: entity.address.city,
            zip: entity.address.zip,
            number: entity.address.number,
            rewardPoints: entity.rewardPoints
        });
    }
    async update(entity) {
        await customer_model_1.default.update({
            name: entity.name,
            active: entity.isActive(),
            street: entity.address.street,
            city: entity.address.city,
            zip: entity.address.zip,
            number: entity.address.number,
            rewardPoints: entity.rewardPoints
        }, {
            where: {
                id: entity.id
            }
        });
    }
    async find(id) {
        try {
            const savedCustomer = await customer_model_1.default.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            });
            const customer = new customer_1.default(savedCustomer.id, savedCustomer.name);
            const address = new address_1.default(savedCustomer.street, savedCustomer.number, savedCustomer.zip, savedCustomer.city);
            customer.changeAddress(address);
            customer.addRewardsPoints(savedCustomer.rewardPoints);
            customer.activate();
            return customer;
        }
        catch (error) {
            throw new Error(`Customer ${id} not found`);
        }
    }
    async findAll() {
        const customers = await customer_model_1.default.findAll();
        return customers.map((savedCustomer) => {
            const address = new address_1.default(savedCustomer.street, savedCustomer.number, savedCustomer.zip, savedCustomer.city);
            const customer = new customer_1.default(savedCustomer.id, savedCustomer.name);
            customer.changeAddress(address);
            customer.activate();
            customer.addRewardsPoints(savedCustomer.rewardPoints);
            return customer;
        });
    }
}
exports.default = CustomerSequelizeRepository;
