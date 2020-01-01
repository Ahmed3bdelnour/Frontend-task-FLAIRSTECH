import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PhotosComponent } from './components/photos/photos.component';
import { UsersResolverService } from './resolvers/users-resolver.service';


const routes: Routes = [
  {
    path: '', component: UsersComponent, resolve: {
      users: UsersResolverService
    }
  },
  {
    path: 'user/:id', component: UserInfoComponent, children: [
      { path: '', component: AlbumsComponent },
      { path: 'album/:albumId', component: PhotosComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
