import { Gender } from "../enums/gender.enum";
import { UserType } from "../enums/user-types.enum";

export interface TokenInfo {
    email: string;
    jwt: string;
    id: number;
    identityNo: string;
    mobilePhone: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    gender?: Gender;
    hasUserErrorLoginHistory: boolean;
    roles: string[];
    roleGroups: string[];
    institutionCode: number;
    userType: UserType
    tokenInfo: TokenInfo,
}
