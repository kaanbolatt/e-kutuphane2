import { Gender } from '../../shared/enums/gender.enum';
import { UserType } from '../../shared/enums/user-types.enum';
import { Role } from './role.interface';

export interface UserList {
    id: number;
    name: string;
    surname: string;
    email: string;
    mobilePhone: string;
    identityNo: string;

    userType?: UserType;
    gender?: Gender;
    role?:Role
    isActive?: boolean;
    isTestUSer?: boolean;


    BirthDate?:Date;
    createdDate?: Date;
    dateOfBirth?: Date;
    isEmailVerify?: boolean;
    CityCode?:number;
    CaptchaToken?:string;
    InstitutionCode?:number
    RegisterInstitutionCode?:number



}
