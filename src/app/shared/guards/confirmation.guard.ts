import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import { CommonHelper } from '../helpers/common-helper';

type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;


export interface CanComponentDeactivate {
  canDeactivate: () => CanDeactivateType;
  isShowConfirmLeaveModal: boolean
}


@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<CanComponentDeactivate> { //
  confirmLeaveModal: any;
  constructor(public ch:CommonHelper) { }

  
  canDeactivate(component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) : CanDeactivateType {
        this.ch.hideLoader()

    if(component.isShowConfirmLeaveModal){
      const subject = new Subject<boolean>();
      const modalRef = document.getElementById('confirmLeaveModal');
      this.confirmLeaveModal = new bootstrap.Modal(modalRef);

      this.confirmLeaveModal.show();
      //this.confirmLeaveModal.content.subject = subject;
      const nextLink = document.getElementById('nextLink');
      nextLink.innerHTML=nextState.url;
      return subject.asObservable();
    }
    return true;

    //return confirm('Any unsaved data will be lost. Сontinue?');
  }
}