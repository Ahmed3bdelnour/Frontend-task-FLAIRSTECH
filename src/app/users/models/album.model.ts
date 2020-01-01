export class Album {
    userId: number;
    id: number;
    title: string;

    constructor(_id, _userID, _title){
    this.id = _id;
    this.userId = _userID;
    this.title = _title;
    }
}