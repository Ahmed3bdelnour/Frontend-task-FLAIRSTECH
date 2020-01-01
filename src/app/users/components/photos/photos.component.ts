import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos: Photo[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) { }

  ngOnInit() {
    // getting album id from  url then getting photos
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        let albumId = +params.get('albumId');
        this.restService.getAlbumPhotos(albumId).subscribe(
          (photos) => {
            this.photos = photos;
          },
          (err) => {
            console.log(err);
          }
        )
      }
    );
  }

}
