export class Alert{
    type: string;
    message: string;

    constructor(_type, _message){
        this.type = _type;
        this.message= _message;
    }
}