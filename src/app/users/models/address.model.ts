export class Address{
    street: string;
    suite: string;
    city: string;

    constructor(_street, _suite, _city){
        this.street = _street;
        this.suite = _suite;
        this.city = _city;
    }
}