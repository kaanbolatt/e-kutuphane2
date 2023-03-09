import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CommonHelper } from '../helpers/common-helper';
import { UserHelper } from '../helpers/user-helper';
import { RoleTypeEnum } from '../enums/role-type.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public router: Router, public uh: UserHelper, private ch: CommonHelper) { }

  canActivate(_route: ActivatedRouteSnapshot): boolean {

    if (JSON.parse(localStorage.getItem("user_info")).jwtDto.roleGuid != RoleTypeEnum.ADMIN && JSON.parse(localStorage.getItem("user_info")).jwtDto.roleGuid != RoleTypeEnum.SUPERADMIN) {
      this.router.navigate(['/']);
      this.ch.messageHelper.showErrorMessage('Bu sayfaya erişim yetkiniz bulunmamaktadır.');
      return false;
    }

    return true;
  }
}
