import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }
    
    get id (): string {
        return this._id;
    }

    get name (): string {
        return this._name;
    }

    get rewardPoints (): number {
        return this._rewardPoints;
    }

    get address (): Address {
        return this._address;
    }
    
    get fullAddress (): string {
        return `${this._address.street}, ${this._address.number}.\n${this._address.zip} ${this._address.city}`
    }
    isActive() : boolean {
        return this._active
    }
    
    validate() {
        if(this._name.length === 0)
            throw new Error("Name is required")
        if(this._id.length === 0)
            throw new Error("Id is required")
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if(this._address === undefined)
            throw new Error('Address is required to active a customer')
        
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address
    }

    changeAddress(address: Address) {
        this._address = address
        this.validate();
    }
    
    addRewardsPoints(points: number) {
        this._rewardPoints += points;
    }
}