import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DatatableInfo } from '../models/datatable-info';
import { IdNamePair } from '../models/id-name-pair';
import { FormGroup } from '@angular/forms';

@Injectable()
export class GlobalVariables {
  displayLoader = false;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100, 250, 1000];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  phoneNumberPrefix = '+90 (5';
  phoneNumberMask = '00) 000-0000';
  tcKimlikNoMask = '99999999999';
  diplomaNoMask = '999999';

  ibanMask = '000000000000000000000000';
  ibanPrefix = 'TR';

  dataTableInfos?: DatatableInfo[] = [];
  fileUploadFormData = new FormData();
  fileUploadMaxDataSize = 5242880;
  fileUploadShowMaxDataSize = '5 Mb';
  fileUploadAcceptAllExtension = 'image/jpeg,image/jpg,image/png,image/webp, application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  fileUploadShowAcceptAllExtensions = 'jpeg,jpg,png,webp,pdf';
  fileUploadShowPdfExtension = 'pdf';

  fileUploadAcceptImageExtension = 'image/jpeg,image/jpg,image/png,image/webp';
  fileUploadAcceptPdfExtension = 'application/pdf';
  fileUploadShowAcceptImageExtensions = 'jpeg,jpg,png,webp';

  menuItem: MenuItem[] = [];
  menuItemDefinitions: IdNamePair[] = []; // id:random guid, name: router'daki page name

  dateFormat = 'DD/MM/YYYY';
  dateTimeFormat = 'DD/MM/YYYY HH:mm:ss';
  timeFormat = 'HH:mm:ss';
  tempData = {};

  //gridFilterInfos?: FormGroup[] = [];

  gridFilterInfos: { [key: string]: FormGroup };

}
