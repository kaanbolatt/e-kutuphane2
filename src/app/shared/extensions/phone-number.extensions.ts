/* eslint-disable space-before-function-paren */
import { AppInjector } from '../bases/app-injector.service';
import { GlobalVariables } from '../constants/global-variables';


declare global {
    interface String {
        getFormattedPhoneNumber(): string;
        getFormattedOfficePhoneNumber(): string;
    }
}
String.prototype.getFormattedPhoneNumber = function (): string {
    const injector = AppInjector.getInjector();
    const globalVariables: GlobalVariables = injector.get(GlobalVariables);

    const phone = (globalVariables.phoneNumberPrefix + this) as string;
    const formattedPhone = phone.replace(' ', '').replace('(', '');
    return formattedPhone;
};

String.prototype.getFormattedOfficePhoneNumber = function (): string {
    const phone = ('+90' + this) as string;
    const formattedPhone = phone.replace(' ', '');
    return formattedPhone;
};
export { };
