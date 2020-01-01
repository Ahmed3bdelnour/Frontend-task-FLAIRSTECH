export class Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    constructor(_id, _albumId, _title, _url, _thumbnailUrl) {
        this.id = _id;
        this.albumId = _albumId;
        this.title = _title;
        this.url = _url;
        this.thumbnailUrl = _thumbnailUrl;
    }
}
