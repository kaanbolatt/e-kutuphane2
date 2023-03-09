import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CommonHelper } from '../helpers/common-helper';
import { UserHelper } from '../helpers/user-helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public ch: CommonHelper,
    public uh: UserHelper

    
  ) { }

  canActivate(): boolean {

    if (!this.uh.isLoggedIn()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      window.location.href = (this.ch.getUiUrl() + '/hesap/giris');
      return false;
    }

    return true;
  }
}
