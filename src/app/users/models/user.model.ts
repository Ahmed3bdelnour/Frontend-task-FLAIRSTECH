import { Address } from './address.model';

export class User {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: Address;

    constructor(_id, _name, _email, _phone, _address){
        this.id = _id;
        this.name =_name;
        this.email = _email;
        this.phone = _phone;
        this.address = _address;
    }
}