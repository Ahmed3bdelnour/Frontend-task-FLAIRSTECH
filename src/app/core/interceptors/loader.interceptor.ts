import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './../services/loader.service';
import { AlertService } from '../services/alert.service';
import { Alert } from '../models/alert.model';

@Injectable()

// loader interceptor to show and hide loader
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(
        private loaderService: LoaderService,
        private alertService: AlertService
        ) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.showLoader.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.requests.push(req);
        this.loaderService.showLoader.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.alertService.addAlertSubject.next(new Alert('danger', err.message));
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
                    
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}