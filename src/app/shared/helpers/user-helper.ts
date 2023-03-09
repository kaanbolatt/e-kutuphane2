import { ElementRef, Injectable } from '@angular/core';
import { DateHelper } from './date-helper';
import { UserInfo } from '../interfaces/user-info';
import { MessageHelper } from './message-helper';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder } from '@angular/forms';
import { CommonHelper } from './common-helper';


@Injectable({
  providedIn: 'root'
})
export class UserHelper {

  private _currentUser: UserInfo;

  set currentUser(currentUser: UserInfo) {
    this._currentUser = currentUser;
  }

  //#endregion current user
  //#region  Validation
  telefonNumarasiRegex = /(5+[0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})$/;

  validation = {
    isEmailAddress: (str) => {
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: (str) => {
      const pattern = /\S+/;
      return pattern.test(str);  // returns a boolean
    },
    isNumber: (str) => {
      const pattern = /^\d+$/;
      return pattern.test(str);  // returns a boolean
    },
    isSame: (str1, str2) => str1 === str2,
    isContainsNumber: (str) => {
      const re = /\d/;
      return re.test(str);
    }
  };
  //#endregion Validation
  constructor(
    public ch: CommonHelper,
    public messageHelper: MessageHelper,
    public formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService,

    public dateHelper: DateHelper,

  ) {
  }
  onChangeEye(passwordEyeRef: ElementRef, passwordRef: ElementRef) {

    if (passwordRef.nativeElement.getAttribute('type') === 'text') {
      passwordRef.nativeElement.setAttribute('type', 'password');
      passwordEyeRef.nativeElement.classList.add('pi-eye-slash');
      passwordEyeRef.nativeElement.classList.remove('pi-eye');
    } else {
      passwordRef.nativeElement.setAttribute('type', 'text');
      passwordEyeRef.nativeElement.classList.add('pi-eye');
      passwordEyeRef.nativeElement.classList.remove('pi-eye-slash');
    }
  }
  //#region Current User
  // get currentUser(): UserInfo {
  //   if (this.isNullOrUndefined(this._currentUser)) {
  //     this.setCurrentUser();
  //   }
  //   return this._currentUser;
  // }

  guidGenerator(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  // hasRole(role: RoleEnum) {
  //   return this.currentUser.roles.includes(role.toString());
  // }

  // hasRoleGroup(roleGroup: RoleGroupEnum) {
  //   return this.currentUser.roleGroups.includes(roleGroup.toString());
  // }

  // hasAction(action: string) {
  //   return this.currentUser.roles.includes(action) ? true : false;
  // }
  logout() {
    this.clearLocalStorageItems();
  }

  clearLocalStorageItems() {
    localStorage.setItem('auth_token', null);
    localStorage.setItem('user_info', null);
  }
  // setCurrentUser(): UserInfo {
  //   this.currentUser = JSON.parse(localStorage.getItem('user_info')) as UserInfo;
  //   return this.currentUser;
  // }


  // getYetki<T>(t: any) {
  //   const result = t;
  //   this.currentUser.roles.forEach(element => {
  //     const value = element + '';
  //     result[value.charAt(0).toLowerCase() + value.slice(1)] = true;
  //   });
  //   return result;
  // }
  isLoggedIn(): boolean {
    const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'));
    if (this.isNullOrUndefined(decodedToken)) {
      return false;
    } else if (decodedToken.isPublic == 'true') {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(localStorage.getItem('auth_token'));
    }
  }

  isNullOrUndefined(obj: any) {
    if (obj === undefined || obj === null || obj === '' || obj === ' ') {
      return true;
    } else {
      return false;
    }
  }
}