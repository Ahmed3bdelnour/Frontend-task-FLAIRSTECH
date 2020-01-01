import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RestService } from '../services/rest.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// resolver for getting users data from the DB and resolve to users component
export class UsersResolverService implements Resolve<User[]>{

  constructor(private restService: RestService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.restService.getAllUsers();
  }
}
