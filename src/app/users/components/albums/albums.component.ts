import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';
import { Album } from '../../models/album.model';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  user: User = new User(0, '', '', 0, new Address('', '', ''));
  albums: Album[] = [];

  subscriptions: Subscription[] = [];

  constructor(private restService: RestService, private loaderService: LoaderService) { }

  ngOnInit() {
    // getting passed user from userinfo component then getting albums
    this.subscriptions.push(
      this.restService.userBehaviorSub.subscribe((user) => {
        if (user) {
          this.user = user;

          this.subscriptions.push(
            this.restService.getUsersAlbums(user.id).subscribe(
              (albums) => {
                this.albums = albums;
              },
              (err) => {
                console.log(err);
              }
            )
          );
        }
      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.map(
      subscription => subscription.unsubscribe()
    );
  }

}
