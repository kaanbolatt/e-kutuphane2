import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/bases/base.service';
import { UserLogin } from '../../shared/interfaces/user-login';
import { TokenInfo } from '../../shared/interfaces/token-info.interface';
import { UserList } from '../../shared/interfaces/user-list.interface';
import { Module } from '../interfaces/module.interface';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { UserInfo } from 'src/app/shared/interfaces/user-info';
@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {
  accountControllerName = 'Account';

  constructor() {
    super();
  }
  //#region User

  getToken(model: UserLogin) {
    return this.httpHelper.post<any>(this.accountControllerName, 'GetToken', model);
  }

  userAddOrUpdate(model: any) {
    return this.httpHelper.post(this.accountControllerName, 'UserAddOrUpdate', model);
  }

  getUserById(id: number) {
    return this.httpHelper.get<any>(this.accountControllerName, 'UserGet', this.gh.createParams({ id }));
  }

  addUser(model: UserInfo) {
    return this.httpHelper.post<UserInfo>(this.accountControllerName, 'UserAddOrUpdate', model);
  }

  getUser(str: any) {
    return this.httpHelper.get<Role[]>(this.accountControllerName, 'UserListForAutoComplete', this.gh.createParams(str))
  }

  userListForGrid() {
    return this.httpHelper.get<UserList[]>(this.accountControllerName, 'UserListForGrid', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }

  getKullaniciProfili() {
    return this.httpHelper.get(this.accountControllerName, 'UserProfileGet');
  }

  userChangePassword(kullaniciSifre: any) {
    return this.httpHelper.post(this.accountControllerName, 'UserChangePassword', kullaniciSifre);
  }

  deleteUser(id: number) {
    return this.httpHelper.delete<Role[]>(this.accountControllerName, 'UserDelete', id)
  }
  changeUserState(id: number) {
    const param={"id":id}
    return this.httpHelper.get<any>(this.accountControllerName, 'UserStateChange', this.gh.createParams({ id }));
  }

  //#endregion User

  //#region Role
  getModuleList() {
    return this.httpHelper.get<Module[]>(this.accountControllerName, 'ModuleList');
  }

  addRole(role: Role) {
    return this.httpHelper.post<Role>(this.accountControllerName, 'RoleAddOrUpdate', role);
  }

  getRoleForGrid() {
    return this.httpHelper.get<Role[]>(this.accountControllerName, 'RoleListForGrid', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }
  getRole(str: any) {
    return this.httpHelper.get<Role[]>(this.accountControllerName, 'RoleListForAutoComplete', this.gh.createParams(str))
  }
  getRoleById(id: any) {
    return this.httpHelper.get<Role>(this.accountControllerName, 'RoleGet', this.gh.createParams(id))
  }

  deleteRole(id: number) {
    return this.httpHelper.delete<Role[]>(this.accountControllerName, 'DeleteRole', id)
  }
  //#endregion Role
}
