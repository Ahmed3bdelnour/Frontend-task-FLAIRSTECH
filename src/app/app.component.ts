import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { Alert } from './core/models/alert.model';
import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //show or hide loader for  http requests
  showLoader: boolean;

  // alerts to be shown if errors or sucess messages
  alerts: Alert[] = [];

  constructor(
    private loaderService: LoaderService,
    private alertService: AlertService
    ) {
    //subscribe to loader subject
    this.loaderService.showLoader.subscribe(
      (showLoader) => {
        this.showLoader = showLoader;
      }
    );

    //subscribe to alert subject to add alerts
    this.alertService.addAlertSubject.subscribe((alert: Alert) => {
      this.alerts.unshift(alert);
    });

    //to reset alerts if it is needed
    this.resetAlerts();

  }

  ngOnInit() {
  }

  /** 
   * close the alert when click on close button
   * @param  {Alert} alert  => message or alert to be deleted on clicking close btn
   * @return {void} 
   * @author Ahmed Abdelnour
  */
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  
  /**
   * reset alerts array to empty array
   * @return {void} 
   * @author Ahmed Abdelnour
  */
  resetAlerts() {
    this.alerts = [];
  }

}
