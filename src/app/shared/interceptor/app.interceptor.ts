import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonHelper } from '../helpers/common-helper';
import { ResultType } from '../enums/result-type';
import { Router } from '@angular/router';
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private ch: CommonHelper, public router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.ch.showLoader();
    }, 0);
    const token = localStorage.getItem('auth_token');
    if (token != undefined && token != null) {
      request = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + localStorage.getItem('auth_token'),
        },
      });
    }
    // tr default
    request = request.clone({ setHeaders: { 'accept-language': 'tr-TR' } });

    request = request.clone({
      setHeaders: {
        'evital-app-local-time-zone-iana':
          Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    });
    this.convertDates(request);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Middle ware den dönen genel hata.
            if (
              !event.ok &&
              event.status == 200 &&
              Number(event.body.ResultType) == ResultType.error
            ) {
              this.ch.messageHelper.showErrorMessage(event.body.Message);
            }
            setTimeout(() => {
              this.ch.hideLoader();
            }, 0);
            this.ch.hideLoader();
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              localStorage.removeItem('auth_token');
              this.ch.messageHelper.showInfoMessage(
                'Oturumunuz sona ermiştir. 2 sn sonra giriş sayfasına yönlendirileceksiniz. Lütfen tekrar giriş yapınız.'
              );
              setTimeout(() => {
                window.location.href = this.ch.getUiUrl() + '/account/login';
              }, 2000);
              //this.router.navigate(['/account/login']);
              setTimeout(() => {
                this.ch.hideLoader();
              }, 0);
              this.ch.hideLoader();
              return;
            }
            else {
              const applicationError = error.headers.get('Application-Error');
              if (applicationError) {
                if (applicationError === '401') {
                  this.ch.messageHelper.showErrorMessage('Yekisiz işlem.');
                } else if (applicationError === '403') {
                  this.ch.messageHelper.showErrorMessage(
                    'İşlem sırasında bir hata oluştu.'
                  );
                } else {
                  this.ch.messageHelper.showErrorMessage(
                    'İşlem sırasında hata oluştu. Hata Kodunuz: ' +
                    applicationError
                  );
                }
              } else if (error.status === 401) {
                this.ch.messageHelper.showErrorMessage('Yetkisiz işlem.');
              } else if (error.status === 403) {
                this.ch.messageHelper.showErrorMessage(
                  'İşlem sırasında bir hata oluştu.'
                );
              } else if (error.status === 400) {
                this.ch.messageHelper.showErrorMessage(
                  error.error[Object.keys(error.error)[0]]
                );
              } else if (error.status === 405) {
                this.ch.messageHelper.showErrorMessage(error.error.Message);
              } else {
                this.ch.messageHelper.showErrorMessage(
                  'İşlem sırasında bilinmeyen bir nedenden dolayı hata oluştu.'
                );
              }
            }

          } else {
            this.ch.messageHelper.showErrorMessage(
              'İşlem sırasında hata oluştu'
            );
          }
          setTimeout(() => {
            this.ch.hideLoader();
          }, 0);
        }
      )
    );
  }

  convertDates(request) {
    if (request['method'] === 'GET') {
      return;
    }

    for (const property in request) {
      if (request.hasOwnProperty(property)) {
        if (request[property] instanceof Date) {
          request[property] =
            request[property].toLocaleDateString('tr-TR') +
            ' ' +
            request[property].toLocaleTimeString('tr-TR');
        } else if (request[property] instanceof Object) {
          this.convertDates(request[property]);
        }
      }
    }
  }
}

export const appInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
