"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = false;
        this._rewardPoints = 0;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    get address() {
        return this._address;
    }
    isActive() {
        return this._active;
    }
    validate() {
        if (this._name.length === 0)
            throw new Error("Name is required");
        if (this._id.length === 0)
            throw new Error("Id is required");
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined)
            throw new Error('Address is required to active a customer');
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    Address(address) {
        this._address = address;
    }
    changeAddress(address) {
        this._address = address;
        this.validate();
    }
    addRewardsPoints(points) {
        this._rewardPoints += points;
    }
}
exports.default = Customer;
