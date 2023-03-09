import { UserType } from '../enums/user-types.enum';
import { Role } from './role.interface';

export interface UserInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
  mobilePhone:string;
  identityNo: string;
  cityCode:number
  districtCode:number
  institutionCode :number
  gender?:number
  registerInstitutionCode?:number
  userType: UserType;
  roleId: number;
  roleGuid: string;
} 
