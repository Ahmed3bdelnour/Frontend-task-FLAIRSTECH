import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // subject to control loader from loader interceptor
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

}
