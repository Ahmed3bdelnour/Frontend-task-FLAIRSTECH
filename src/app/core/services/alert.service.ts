import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // subjets to control alerts and error messages
  addAlertSubject: Subject<Alert> = new Subject();

  constructor() { }

}
