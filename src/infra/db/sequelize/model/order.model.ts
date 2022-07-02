import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order_items.model";

@Table({
    tableName: 'orders',
    timestamps: false
})
export default class OrderModel extends Model {
    
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    declare customerId: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel
    
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[]

    @Column
    declare total: number;
}