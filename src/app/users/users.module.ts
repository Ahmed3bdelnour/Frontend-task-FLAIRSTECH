import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from '@angular/material/table';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PhotosComponent } from './components/photos/photos.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
  UsersComponent,
  AddUserModalComponent,
  UserInfoComponent,
  AlbumsComponent,
  PhotosComponent
],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgSelectModule
  ],
  entryComponents:[
    AddUserModalComponent
  ]
})
export class UsersModule { }
