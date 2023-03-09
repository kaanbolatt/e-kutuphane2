import { UserType } from '../enums/user-types.enum';


export interface UserFilter {
  name?: string;
  surname?: string;
  email?: string;
  mobilePhone?:string;
  identityNo?: string;
  isActive?:boolean;
  creatDate?:Date;
  updateDate?:Date;
  cityCode?:number;
  districtCode?:number
  institutionCode?:number
  roleId?:number;
} 




