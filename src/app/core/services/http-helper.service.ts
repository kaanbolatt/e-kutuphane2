import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';
import ServiceResult from '../../shared/models/service-result';
import { CommonHelper } from '../../shared/helpers/common-helper';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DownloadDocumentResponse } from '../interfaces/download-document-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpHelper {
  loaderDisplay = true;
  apiUrl: string;
  constructor(
    private http: HttpClient,
    private ch: CommonHelper
  ) {
    this.apiUrl = environment.apiUrl;

  }

  get<T>(controllerName: string, methodName: string, params: HttpParams = null, headers: HttpHeaders = null): Observable<ServiceResult<T>> {
    headers = this.createDefaultHeaders();
    params = this.addDefaultQueryParameters(params);

    if (params === null) {
      if (headers !== null) {
        return this.http.get<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName, { headers });
      } else {
        return this.http.get<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName);
      }
    } else {
      this.convertDates(params);
      if (headers !== null) {
        return this.http.get<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName, { params, headers });
      } else {
        return this.http.get<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName, { params });
      }
    }
  }

  post<T>(controllerName: string, methodName: string, postedObject, headers: HttpHeaders = null): Observable<ServiceResult<T>> {
    headers = this.createDefaultHeaders();
    const model = this.addDefaultParameters(postedObject);

    if (headers !== null) {
      return this.http.post<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName, model, { headers });
    } else {
      return this.http.post<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName, model);
    }
  }

  put<T, PostedObject>(controllerName: string, methodName: string, id, postedObject?: PostedObject, headers: HttpHeaders = null): Observable<ServiceResult<T>> {
    headers = this.createDefaultHeaders();
    if (headers !== null) {
      return this.http.put<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName + '?id=' + id, postedObject, { headers });
    } else {
      return this.http.put<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName + '?id=' + id, postedObject);
    }
  }

  delete<T>(controllerName: string, methodName: string, id, headers: HttpHeaders = null): Observable<ServiceResult<T>> {
    headers = this.createDefaultHeaders();
    if (headers !== null) {
      return this.http.delete<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName + '?id=' + id, { headers });
    } else {
      return this.http.delete<ServiceResult<T>>(this.apiUrl + controllerName + '/' + methodName + '?id=' + id);
    }
  }

  getBlob<T>(controllerName: string, methodName: string, params: HttpParams = null) {
    return this.http.get(this.apiUrl + controllerName + '/' + methodName, { responseType: 'blob', params });
  }

  downloadFile(controllerName: string, methodName: string, params: HttpParams = null) {
    this.http.get(this.apiUrl + controllerName + '/' + methodName, { responseType: 'blob', params }).subscribe(blob => {
      const fileName = params.get('downloadUrl').replace(/^.*[\\\/]/, '');
      importedSaveAs(blob, fileName);
    });
  }


  convertBase64ToBlob(content: any, fileName: string, format: string) {
    const byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: format });

    importedSaveAs(blob, fileName, false);
  }

  createDefaultHeaders() {
    const headers = new HttpHeaders({
      'platformType': '1',//Web
      'brand': 'Web',
      'deviceId': `${navigator.userAgent}`,
      'osVersion': `${navigator['oscpu']}`,
    });

    return headers;
  }

  private addDefaultParameters(postedObject: any): any {
    //  add default parameters
    postedObject['platformType'] = 1;//Web
    postedObject['brand'] = 'Web';
    postedObject['model'] = navigator.userAgent;
    postedObject['deviceId'] = navigator.userAgent;
    postedObject['osVersion'] = navigator['oscpu'];
    return postedObject;
  }

  private addDefaultQueryParameters(queryParams: HttpParams) {
    queryParams['platformType'] = 1;//Web
    queryParams['brand'] = 'Web';
    queryParams['model'] = navigator.userAgent;
    queryParams['deviceId'] = navigator.userAgent;
    queryParams['osVersion'] = navigator['oscpu'];
    return queryParams;
  }


  private convertDates(params) {
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        if (params[property] instanceof Date) {
          params[property] = params[property].toLocaleDateString('tr-TR') + ' ' + params[property].toLocaleTimeString('tr-TR');
        } else if (params[property] instanceof Object) {
          this.convertDates(params[property]);
        }
      }
    }
  }
}
