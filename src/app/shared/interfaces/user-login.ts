
/**
 * @description User Login interface
 */
export interface UserLogin {
    email: string;
    password: string;
    captchaToken: string;
    isResend?: boolean;
    verifyCode :string;
}
