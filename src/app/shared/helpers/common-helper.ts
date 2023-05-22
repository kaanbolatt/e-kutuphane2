import { MessageService, SelectItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { DateHelper } from './date-helper';
import { MessageHelper } from './message-helper';
import { ResultType } from '../enums/result-type';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ServiceResult from '../models/service-result';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomEncoder } from '../extensions/custom-encoder';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../constants/global-variables';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import 'jspdf-autotable';
import { Dialog } from 'primeng/dialog';
import { FirstItemTextType } from '../enums/first-item-text-type.enum';
import { environment } from '../../../environments/environment';
import { EncryptionService } from '../../../app/core/services/encryption.service';
import { UserInfo } from '../interfaces/user-info';
import { InstitutionType } from '../enums/institution-type.enum';
import { Process } from '../enums/process.enum';
@Injectable({
  providedIn: 'root'
})
export class CommonHelper {

  set currentUser(currentUser: UserInfo) {
    this._currentUser = currentUser;
  }

  //#region  Validation
  private _currentUser: UserInfo;
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
    public messageHelper: MessageHelper,
    private globalVariables: GlobalVariables,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: NgxUiLoaderService,
    public dateHelper: DateHelper,
    private location: Location,
    private encriptionService: EncryptionService,
  ) {
  }

  //#region Enum Dropdown List

  /**
   * @tanim Dropdownlist için ilk element ekler.
   * @param selectItemList İlk element eklenilecek liste.
   * @param itemTextType Eklenilecek metnin türü => 1: "Lütfen Seçiniz",  2: "Tümü"
   * @param itemTextType
   * @param customText
   * @returns
   * */
  addUnselectedItem(selectItemList: SelectItem[], itemTextType: FirstItemTextType, customText = ''): SelectItem[] {
    const itemList = selectItemList.slice(0, selectItemList.length);
    if (itemTextType === FirstItemTextType.pleaseSelect) {
      itemList.unshift({ value: '', label: 'Lütfen Seçiniz' });
    } else if (itemTextType === FirstItemTextType.all) {
      itemList.unshift({ value: '', label: 'Tümü' });
    } else if (itemTextType === FirstItemTextType.empty) {
      itemList.unshift({ value: '', label: customText });
    }
    return itemList;
  }

  /**
   * @tanim Enum'daki tüm değerleri ve description'ları SelectItem array'e dönüştürür.
   * @param enumObj Değerleri alınacak enum.
   * @param descriptions Enum'a ait description değerleri.
   * @param exceptedValues (isteğe bağlı) Listeye eklenmesi istenilmeyen enum değer dizisi (Örnek parametre: [Cinsiyet.Bilinmiyor, Cinsiyet.Kadin])
   * @param sortByLabel (isteğe bağlı) Dizinin isme göre sıralanmasını sağlar. (Default = false)
   */
  enumToSelectItemArray<TEnum>(enumObj: TEnum, descriptions: Record<keyof TEnum, string>, exceptedValues: number[] = [], sortByLabel: boolean = false): SelectItem[] {
    let filteredObjectKeys = (Object.keys(enumObj) as Array<keyof TEnum>).filter(p => typeof enumObj[p] === 'number');
    for (const expected of exceptedValues) {
      filteredObjectKeys = filteredObjectKeys.filter(p => p !== enumObj[expected]);
    }
    let mappedSelectItems = filteredObjectKeys.map(p => ({
      label: descriptions[p],
      value: (enumObj[p])
    }));
    if (sortByLabel) {
      mappedSelectItems = mappedSelectItems.sort((a, b) => (a > b ? -1 : 1));
    }
    return mappedSelectItems;
  }

  listToSelectItemArray<T>(list: T[], exceptedValues: T[] = [], sortByLabel: boolean = false): SelectItem[] {

    for (const expected of exceptedValues) {
      list = list.filter(p => p !== expected);
    }
    let mappedSelectItems = list.map(p => ({
      label: p + '',
      value: p + ''
    }));

    if (sortByLabel) {
      mappedSelectItems = mappedSelectItems.sort((a, b) => (a > b ? -1 : 1));
    }
    return mappedSelectItems;
  }

  createSelectItem(value: any, label?: string, styleClass?: string, icon?: string, title?: string, disabled?: boolean): SelectItem {
    return {
      label, value, styleClass, icon, title, disabled
    };
  }
  //#endregion Enum Dropdown List

  //#region HTTP Params Header

  checkResult(result: ServiceResult<any>): boolean {
    let checkResult = true;

    if (result.resultType === ResultType.warning) {
      this.messageHelper.showWarnMessage(result.message);
    }

    if (result.resultType === ResultType.error) {
      this.messageHelper.showErrorMessage(result.message);
    }

    if (result.resultType === ResultType.warning || result.resultType === ResultType.error) {
      checkResult = false;
    }
    return checkResult;
  }

  checkResultLight(result: ServiceResult<any>): boolean {
    let checkResult = true;

    if (result.resultType === ResultType.warning) {
      this.messageHelper.showWarnMessage(result.message);
    }

    if (result.resultType === ResultType.error) {
      this.messageHelper.showErrorMessage(result.message);
    }

    if (result.resultType === ResultType.success) {
      this.messageHelper.showSuccessMessage(result.message);
    }

    if (result.resultType === ResultType.warning || result.resultType === ResultType.error) {
      checkResult = false;
    }
    return checkResult;
  }


  getUiUrl() {
    return environment.uiUrl;
  }

  getUrlParams(route: ActivatedRoute = null) {
    console.log("🚀 ~ file: common-helper.ts:181 ~ CommonHelper ~ getUrlParams ~ route:", route)
    if (Object.keys(this.route.snapshot.params).length > 0) {
      return this.convertUrlParamsToObject(this.decrypt(this.route.snapshot.params['q']));
    }
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      return this.convertUrlParamsToObject(this.decrypt(this.route.snapshot.queryParams['q']));
    }
    if (!!route) {
      if (Object.keys(route.snapshot.params).length > 0) {
        return this.convertUrlParamsToObject(this.decrypt(route.snapshot.params['q']));
      }
      if (Object.keys(route.snapshot.queryParams).length > 0) {
        return this.convertUrlParamsToObject(this.decrypt(route.snapshot.queryParams['q']));
      }
    }

    return {};
  }

  getUrlParamsWithoutEncode(route: ActivatedRoute = null) {
    if (Object.keys(this.route.snapshot.params).length > 0) {
      return this.route.snapshot.params;
    }
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      return this.route.snapshot.queryParams;
    }
    if (!!route) {
      if (Object.keys(route.snapshot.params).length > 0) {
        return route.snapshot.params;
      }
      if (Object.keys(route.snapshot.queryParams).length > 0) {
        return route.snapshot.queryParams;
      }
    }

    return {};
  }

  createParamsFromArray(objs: any[]) {
    let params = new HttpParams({ encoder: new CustomEncoder() });
    for (const obj of objs) {
      if (obj) {
        // eslint-disable-next-line guard-for-in
        for (const property in obj) {
          const value = obj[property];
          if (value != null && value !== undefined) {
            params = params.append(encodeURIComponent(property), encodeURIComponent(value));
          }
        }
      }
    }
    return params;
  }
  isNullOrUndefined(obj: any) {
    if (obj === undefined || obj === null || obj === '' || obj === ' ') {
      return true;
    } else {
      return false;
    }
  }

  createHeaders(obj: any) {
    let params = new HttpHeaders();
    if (obj) {
      for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
          const value = obj[property];
          if (!this.isNullOrUndefined(value)) {
            if (value instanceof Array) {
              for (const val of value) {
                params = params.append(property, val); // (encodeURIComponent(property), encodeURIComponent(value));
              }
            } else {
              params = params.append(property, value); // (encodeURIComponent(property), encodeURIComponent(value));
            }
          }
        }
      }
    }
    return params;
  }
  //#endregion HTTP Params Header

  //#region enumHelper
  institutionType(id: number) {
    return InstitutionType[id]

  }
  processType(i: number) {
    return Process[i]
  }
  //#endregion
  //#region Form

  /**
   * @tanim form array içindeki değerleri siler
   * @param formArray
   */
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  /**
   * @tanim Nesneyi FormGroup'a map etmek için kullanılır.
   * @param sourceObject kaynak nesne.
   * @param targetFormGroup hedef FormGroup.
   * */
  mapToFormGroup(sourceObject: any, targetFormGroup: FormGroup) {
    // eslint-disable-next-line guard-for-in
    for (const key in targetFormGroup.controls) {
      const control = targetFormGroup.get(key);
      if (!this.isNullOrUndefined(sourceObject[key])) {
        if (typeof sourceObject[key].getMonth === 'function') {
          control.setValue(new Date(sourceObject[key]));
        } else if (typeof (sourceObject[key]) === 'string') {
          control.setValue(sourceObject[key].toString());
        } else {
          control.setValue(sourceObject[key]);
        }
        sourceObject[key] = control.value;
      }
    }
  }


  /**
   * @tanim Nesneyi FormGroup'a map etmek için kullanılır.
   * @param sourceObject kaynak nesne.
   * @param targetFormGroup hedef FormGroup.
   * @param allowed izinverilenliste array.
   * */
  mapToFormGroupWithAllowedList(sourceObject: any, targetFormGroup: FormGroup, allowed: any[]) {
    const filtered = Object.keys(sourceObject)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = sourceObject[key];
        return obj;
      }, {});
    // eslint-disable-next-line guard-for-in
    for (const key in targetFormGroup.controls) {
      const control = targetFormGroup.get(key);
      if (!this.isNullOrUndefined(filtered[key])) {
        if (typeof sourceObject[key].getMonth === 'function')
          control.setValue(new Date(sourceObject[key]));;
      } else if (typeof (filtered[key]) === 'string') {
        control.setValue(filtered[key].toString());
      } else {
        control.setValue(filtered[key]);
      }
      filtered[key] = control.value;
    }
  }

  /**
   * @tanim FormGroup'u nesneye map etmek için kullanılır.
   * @param sourceObject kaynak FormGroup.
   * @param targetFormGroup hedef nesne.
   */
  mapToObject(sourceFormGroup: FormGroup, targetObject: any) {
    // eslint-disable-next-line guard-for-in
    for (const key in sourceFormGroup.controls) {
      const control = sourceFormGroup.get(key);
      targetObject[key] = control.value;
    }
  }

  getControlValue(formGroup: FormGroup, key: string) {
    return formGroup.controls[key].value;
  }

  setControlValue(formGroup: FormGroup, key: string, value: any) {
    return formGroup.controls[key].setValue(value);
  }

  // TODO: Recursive yapılacak
  setFormDisableOrEnable(form: FormGroup, disable: boolean) {
    for (const control in form.controls) {
      if (form.controls.hasOwnProperty(control)) {
        if (disable === true) {
          form.controls[control].disable();
        } else {
          form.controls[control].enable();
        }
      }
    }
  }

  //#endregion Form

  //#region PrimeNG Grid

  /**
   * @tanim Grid'e ait filtreleri getirir.
   * @param datatableIndex (isteğe bağlı) Component'teki kaçıncı datatable olduğu.
   */


  /**
   * @tanim Grid'e ait arama filtrelerini getirir.
   * @param datatableIndex (isteğe bağlı) Component'teki kaçıncı datatable olduğu.
   */

  /**
   * @tanim Bir nesnenin istenilen property name'lerini değiştirmek için kullanılır.
   * @param obj Property adları değiştirilecek nesne.
   * @param differentPropertyNames Değiştirilecek property isimlerinin listesi.
   */
  convertObjectProperty(obj: any, differentPropertyNames: [string[]]) {
    for (const different of differentPropertyNames) {
      obj[different[1]] = obj[different[0]];
      delete obj[different[0]];
    }
    return obj;
  }

  /**
   * @tanim Bir nesne array'inin istenilen property name'lerini değiştirmek için kullanılır.
   * @param obj Property adları değiştirilecek nesne array'ı.
   * @param differentPropertyNames Değiştirilecek property isimlerinin listesi.
   */
  convertArrayProperty(objArray: any[], differentPropertyNames: [string[]]) {
    // eslint-disable-next-line guard-for-in
    for (const i in objArray) {
      this.convertObjectProperty(objArray[i], differentPropertyNames);
    }

    return objArray;
  }



  /**
   *  @tanim Sayfanın ilk açılışında var olan tüm datatable bilgilerini temizlemek için kullanılır.
   */


  /**
   * @tanim Sayfaya geri gelindiğinde filter bilgilerinin kaybolmaması için yapıldı sadece datagrid yenilenir.
   * @param datatableIndex
   */

  /**
   * @tanim Sayfadaki temizle butonu için kullanılır.
   * @param datatableIndex (isteğe bağlı) Component'teki kaçıncı datatable olduğu.
   * @param ignoredProperties (isteğe bağlı) Form group'ta temizlenmeyecek olan property'ler.
   */


  /**
   * @tanim Sayfadaki arama filtrelerini datatable arama filtrelerine atar. Sadece ara butonununda çalıştırılmalıdır. Aksi taktirde 1. sayfadan 2. sayfaya geçerken istenmeyen bir filtre uygulanabilir.
   * @param filterForm sayfadaki filtre FormGroup'u.
   * @param datatableIndex (isteğe bağlı) Component'teki kaçıncı datatable olduğu.
   */














  //#endregion PrimeNG Grid

  //#region Excel


  //#region Message Helper 


  //#endregion Message Helper

  //#endregion Excel

  //#region  Date



  //#endregion  Date

  //#region Validation
  telefonNumarasiformat() {
    return this.telefonNumarasiRegex;
  }

  telefonNumarasiKontrol(telNo: string) {
    let phoneNumberControl = '';
    for (let i = 0; i < 10; i++) {
      phoneNumberControl = '(' + i + i + i + ') ' + i + i + i + '-' + i + i + i + i;
      if (telNo == phoneNumberControl) {
        return false;
      }
    }
    return true;
  }

  tCKimlikDogrula(value) {
    value = value.toString();
    const isEleven = /^\d{11}$/.test(value);
    let totalX = 0;
    let totalY1 = 0;
    let totalY2 = 0;
    for (let i = 0; i < 10; i++) {
      totalX += Number(value.substr(i, 1));
    }
    const isRuleX = totalX % 10 === value.substr(10, 1);
    for (let i = 0; i < 10; i += 2) {
      totalY1 += Number(value.substr(i, 1));
    }
    for (let i = 1; i < 10; i += 2) {
      totalY2 += Number(value.substr(i, 1));
    }
    const isRuleY = ((totalY1 * 7) - totalY2) % 10 === value.substr(9, 0);
    return isEleven && isRuleX && isRuleY;
  }

  changeControlValidation(formGroup: FormGroup, key: string, validator: ValidatorFn[]) {
    const formControl = formGroup.controls[key];
    formControl.setValidators(validator);
    formControl.updateValueAndValidity();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control.invalid) {
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
          control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      }
    });
  }

  validateAllFormFieldsGetResult(formGroup: FormGroup): any {
    let result;
    let controlValue = true;

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control.invalid && controlValue) {
        result = field;
        controlValue = false;
      }
    });
    return result;
  }

  //#endregion Validation

  //#region Authorization

  setCurrentUser(): UserInfo {
    if (this.isNullOrUndefined(localStorage.getItem('user_info')) || this.isNullOrWhiteSpace(localStorage.getItem('user_info'))) {
      return null;
    }
    this.currentUser = JSON.parse(localStorage.getItem('user_info')) as UserInfo;
    return this.currentUser;
  }


  //#endregion Authorization

  //#region File

  createFormDataWithFiles(fileParameterNames: string[], additionalObject: any) {
    const formData = new FormData();
    const fileObjectName = 'Files';

    fileParameterNames.forEach((fileParameter, i) => {
      const files = this.globals.fileUploadFormData.getAll(fileParameter);
      console.log("files", files);
      files.forEach(file => {
        formData.append(fileObjectName, file);
      });
    });

    const additionalObjectName = 'value';
    if (!this.isNullOrUndefined(additionalObject) && !this.isNullOrWhiteSpace(additionalObjectName)) {
      formData.append(additionalObjectName, JSON.stringify(additionalObject));
    }
    return formData;
  }

  createFormDataWithBlobs(fileBlobs: CustomBlob[], additionalObject: any) {
    const formData = new FormData();
    const fileObjectName = 'UploadedFiles';

    fileBlobs.forEach(item => {
      formData.append(fileObjectName, item.blob, item.fileName.toString()); //  file name paraemtresi ile gönderilir.
    });

    const additionalObjectName = 'value';
    if (!this.isNullOrUndefined(additionalObject) && !this.isNullOrWhiteSpace(additionalObjectName)) {
      formData.append(additionalObjectName, JSON.stringify(additionalObject));
    }
    return formData;
  }

  setFilesOnInitial(key: string, fileNames: string[] = []) {
    this.globals.fileUploadFormData.delete(key);
    if (fileNames.length > 0) {
      for (const fileName of fileNames) {
        const file = new File([''], fileName, { type: 'text/plain' });
        this.globals.fileUploadFormData.append(key, file);
      }
    }
  }

  isFileAnImage(fileName: string) {
    return fileName.match(/.(jpg|jpeg|png|gif)$/i);
  }
  //#endregion File

  //#region Crypto

  urlEncrypt(obj: any) {
    let urlParams = '';
    if (obj) {
      for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
          const value = obj[property];
          if (value instanceof Array) {
            for (const val of value) {
              urlParams += property + '=' + (!this.isNullOrUndefined(val) ? val : '') + '&';
            }
          } else {
            urlParams += property + '=' + (!this.isNullOrUndefined(value) ? value : '') + '&';
          }
        }
      }
      urlParams = urlParams.substring(0, urlParams.length - 1);
    }

    urlParams = this.encrypt(urlParams);
    return { q: urlParams };
  }

  encrypt(text: string): string {
    return this.encriptionService.encryptUsingTripleDES(text, false);
  }

  decrypt(text: string): string {
    return this.encriptionService.decryptUsingTripleDES(text);
  }

  //#endregion Crypto

  //#region Cache

  //#endregion Cache

  //#region Yardımcı Metodlar

  createRandomColorList(length: number) {
    const colorList = [];
    for (let index = 0; index < length; index++) {
      const hex = '0123456789ABCDEF';
      let color = '#';
      for (let i = 1; i <= 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
      }
      colorList.push(color);
    }
    return colorList;
  }

  showDialogMaximized(dialog: Dialog) {
    dialog.maximize();
  }

  /**
   * @tanim Belirtilen bir dizenin null, boş veya yalnızca boşluk olup olmadığını belirtir.
   * @param text Test Edilecek Değer.
   */
  isNullOrWhiteSpace(text) {
    if (typeof (text) === 'number' && text.toString() === '') {
      return true;
    } else if (typeof (text) === 'number' && text.toString() !== '') {
      return false;
    } else if (text instanceof Array && text.length === 0) {
      return true;
    } else if (text instanceof Array && text.length > 0) {
      return false;
    }
    return (typeof text === 'undefined' || text == null) || text.replace(/\s/g, '').length < 1;
  }

  get globals() {
    return this.globalVariables;
  }

  showLoader() {
    this.globals.displayLoader = true; // minimum animation time kaldırılamadığı için show hide ediliyor.
    this.loaderService.start();
  }

  hideLoader() {
    this.loaderService.stop();
    this.globals.displayLoader = false; // minimum animation time kaldırılamadığı için show hide ediliyor.
  }

  getLabelFromSelectList(selectList: SelectItem[], id: any) {
    return selectList.filter(p => p.value === id)[0].label;
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  getAyList(): SelectItem[] {
    const aylar: SelectItem[] = [];
    aylar.push({ value: 1, label: 'Ocak' });
    aylar.push({ value: 2, label: 'Şubat' });
    aylar.push({ value: 3, label: 'Mart' });
    aylar.push({ value: 4, label: 'Nisan' });
    aylar.push({ value: 5, label: 'Mayıs' });
    aylar.push({ value: 6, label: 'Haziran' });
    aylar.push({ value: 7, label: 'Temmuz' });
    aylar.push({ value: 8, label: 'Ağustos' });
    aylar.push({ value: 9, label: 'Eylül' });
    aylar.push({ value: 10, label: 'Ekim' });
    aylar.push({ value: 11, label: 'Kasım' });
    aylar.push({ value: 12, label: 'Aralık' });
    return aylar;
  }

  convertTreeToList(root) {
    let denemeListem = [];
    const sonucList = [];

    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push(root);

    while (stack.length !== 0) {
      const node = stack.pop();

      if (node['items'] === null) {
        if (!hashMap[node.data]) {
          hashMap[node.data] = true;
          array.push(node);
        }
      } else {
        let oncekiTitle = '';
        if (node['id'] !== undefined) {
          if (denemeListem.length > 0) {
            oncekiTitle = denemeListem.filter(e => e.endsWith('|!|' + node['id']))[0];
          } else {
            oncekiTitle = node['id'];
          }
          if (node['items'] && node['items'].length > 0) {
            denemeListem = denemeListem.filter(e => !e.endsWith('|!|' + node['id']));
          }
        }

        if (node['items'] && node['items'].length > 0) {
          for (let j = node['items'].length - 1; j >= 0; j--) {
            stack.push(node['items'][j]);
            denemeListem.push(oncekiTitle + '|!|' + node['items'][j]['id']);
          }
        }
      }
    }

    for (const deneme of denemeListem) {
      sonucList.push(deneme.split('|!|'));
    }

    return sonucList;
  }

  nthIndex(str, pat, n) {
    const L = str.length;
    let i = -1;
    while (n-- && i++ < L) {
      i = str.indexOf(pat, i);
      if (i < 0) {
        break;
      }
    }
    return i;
  }



  isNullOrUndefinedWithList(objectList: any[]) {
    let control = false;
    objectList.forEach(element => {
      if (element === undefined || element === null || element === '' || element === ' ') {
        control = true;
      } else {
        control = false;
      }
    });
    return control;
  }

  tabMenuActiveIndex(firstRow: number, secondRow: number, totalRow: number, activeIndex: number) {
    for (let i = 0; i <= totalRow; i++) {
      if (activeIndex === i) {
        this.globals.menuItem[firstRow]['items'][secondRow]['items'][i]['expanded'] = true;
        for (let j = 0; j <= totalRow; j++) {
          if (j === i) {
            continue;
          }
          this.globals.menuItem[firstRow]['items'][secondRow]['items'][j]['expanded'] = false;
        }
      }
    }
  }

  setMenuActiveItem(activeUrl: string) {
    this.globals.menuItem[0]['items'].forEach(element => {
      element.expanded = false;
      if ('/' + element.routerLink[0] == activeUrl) {
        element.expanded = true;
      }
    });
  }

  dinamicXmlControl(ifade: any) {
    let ifadeStr = ifade + '';
    ifadeStr = ifadeStr.toUpperCase();
    if (ifadeStr.includes('DYNAMICXML')) {
      return '';
    } else {
      return ifade;
    }
  }
  //#endregion Yardımcı Metodlar

  //#region Local Storage Back Button

  /**
   * @tanim Geri Dön Butonuna Basınca Çalıştırılır.
   */
  backButton() {
    localStorage.setItem('geriGel', 'true');
    this.router.navigate([localStorage.url.toString()], { relativeTo: this.route });
  }



  backClickedSetMenuItem() {
    this.setMenuActiveItem(this.router.url);
  }

  backClicked() {
    this.location.back();
  }


  //#endregion

  //#region Private Members

  private convertUrlParamsToObject(params: string): any {
    const splittedParams = params.split('&');
    const convertedObject = new Object();
    for (const param of splittedParams) {
      const paramKey = param.split('=')[0];
      const paramValue = param.split('=')[1];
      if (convertedObject.hasOwnProperty(paramKey)) {
        for (const property in convertedObject) {
          if (convertedObject.hasOwnProperty(property)) {
            const previousValue = convertedObject[property];
            if (previousValue instanceof Array) {
              convertedObject[property].push(paramValue);
            } else {
              convertedObject[property] = new Array();
              convertedObject[property].push(previousValue);
              convertedObject[property].push(paramValue);
            }
          }
        }
      } else {
        convertedObject[paramKey] = paramValue;
      }
    }
    return convertedObject;
  }
  //#endregion Private Members

  onPasteWithoutSpace(event: ClipboardEvent, control: AbstractControl) {
    const clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    pastedText = pastedText.replace(/\s/g, "").trim();
    control.setValue(pastedText);
    event.preventDefault();
  }
}

export class CustomBlob {
  constructor(blob: Blob, fileName: string) {
    this.blob = blob;
    this.fileName = fileName;
  }

  blob: Blob;
  fileName: string;
}
