import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  //url of the api from environment
  apiUrl = environment.apiUrl;

  //user behavior subject to pass data from user info component to albums component
  userBehaviorSub: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) { }

  /** 
   * get all users from api and map on the response
   * @return {Observable<User[]>} 
   * @author Ahmed Abdelnour
  */
  getAllUsers() {
    return this.httpClient.get<User[]>(this.apiUrl + 'users').pipe(
      take(1),
      map(
        (users) => {
          return users.map((user) => {
            let userAddress = user.address;
            return new User(user.id, user.name, user.email, user.phone, new Address(userAddress.street, userAddress.suite, userAddress.city));
          });
        }
      ));
  }

  
  /**
   * get user by id from DB
   * @param {number} id => id of user
   * @return {Observable<User>} 
   * @author Ahmed Abdelnour
   */
  getUserById(id) {
    return this.httpClient.get<User>(this.apiUrl + 'users' +  '/' + id).pipe(
      take(1),
      map((user) => {
        let userAddress = user.address;
        return new User(user.id, user.name, user.email, user.phone, new Address(userAddress.street, userAddress.suite, userAddress.city));
      }))
  }

  /**
   * add user to DB
   * @param {User} user => user object to be added 
   * @return {Observable<User>} 
   * @author Ahmed Abdelnour
   */
  addUser(user) {
    return this.httpClient.post(this.apiUrl + 'users', user).pipe(take(1));
  }

  /**
   * get albums of specific user with his id
   * @param {number} id => id of user 
   * @return {Observable<Album[]>} 
   * @author Ahmed Abdelnour
   */
  getUsersAlbums(id) {
    return this.httpClient.get<Album[]>(this.apiUrl + 'users' + '/' + id + '/' + 'albums').pipe(
      take(1),
      map((albums) => {
        return albums.filter(album => album.userId === id);
  
      })
    );
  }

  /**
   * get photos of specific album with its id
   * @param {number} id => id of album 
   * @return {Observable<Photo[]>} 
   * @author Ahmed Abdelnour
   */
  getAlbumPhotos(id){
   return this.httpClient.get<Photo[]>(this.apiUrl + 'albums' + '/' + id + '/photos').pipe(
     take(1),
     map((photos)=>{
      return photos.filter(photo => photo.albumId === id);
      
      })
   );
  }
}
