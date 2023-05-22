import * as XLSX from 'xlsx';
import { RoleEnum } from '../enums/role.enum';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { DateHelper } from './date-helper';
import { UserInfo } from '../interfaces/user-info';
import { MessageHelper } from './message-helper';
import { ColumnType } from '../enums/column-type';
import { GridFilter } from '../models/grid-filter';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatableInfo } from '../models/datatable-info';
import { GridRefreshMode } from '../enums/grid-refresh-mode';
import { CustomEncoder } from '../extensions/custom-encoder';
import { HttpParams,  } from '@angular/common/http';
import { GlobalVariables } from '../constants/global-variables';
import { AbstractControl, FormBuilder, FormGroup,  } from '@angular/forms';
import 'jspdf-autotable';

import { EncryptionService } from '../../../app/core/services/encryption.service';
import { CommonHelper } from './common-helper';
@Injectable({
  providedIn: 'root'
})
export class GridHelper {


  set currentUser(currentUser: UserInfo) {
    this._currentUser = currentUser;
  }

  //#endregion current user
  //#region  Validation
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
  private _currentUser: UserInfo;
  constructor(
    public ch: CommonHelper,
    public messageHelper: MessageHelper,
    private globalVariables: GlobalVariables,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: NgxUiLoaderService,
    public dateHelper: DateHelper,
    private location: Location,
    private encriptionService: EncryptionService,
  ) {
  }
  getGridFilter(datatableIndex: number = 0): GridFilter {
    const dtInfo = this.getDataTableInfo(datatableIndex);
    if (dtInfo.datatable && dtInfo.gridRefreshMode !== GridRefreshMode.exportExcel) {
      const gridFilter = new GridFilter();
      gridFilter.pageFirstIndex = dtInfo.datatable.first;
      gridFilter.sortBy = dtInfo.datatable.sortField;
      gridFilter.isSortAscending = dtInfo.datatable.sortOrder === 1 ? true : false;
      gridFilter.pageSize = dtInfo.datatable.rows;
      if (dtInfo.datatable.multiSortMeta != undefined) {
        for (const sortMeta of dtInfo.datatable.multiSortMeta) {
          gridFilter.sortByMultiName.push(sortMeta.field);
          gridFilter.sortByMultiOrder.push(sortMeta.order);
        }
      }
      return gridFilter;
    } else {
      const gridFilter = new GridFilter();
      gridFilter.pageSize = 247; // Normalden farklı olduğu anlaşılması için herhangi bir sayı verildi(Excel export).Sıfıra primeng izin vermiyor.
      return gridFilter;
    }
  }
  createParams(obj: any, searchfilter?: any) {
    let params = new HttpParams({ encoder: new CustomEncoder() });
    if (obj) {
      for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
          const value = obj[property];
          if (!this.isNullOrUndefined(value)) {
            if (property === 'pageSize' && value === 247) { // Grid excel çıktısı için yapıldı.
              params = params.append('pageSize', '0'); // TODO: Bu rakam 999999999 yapılacak.
            } else {
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
    }
    if (searchfilter) {
      for (const property in searchfilter) {
        if (searchfilter.hasOwnProperty(property)) {
          const value = searchfilter[property];
          if (!this.isNullOrUndefined(value)) {
            /*tarih ise formatlayıp gönder */
            if (typeof value.getMonth === 'function') {
              params = params.append('searchFilter.' + property, this.datePipe.transform(value, 'dd.MM.yyyy HH:mm:ss')); // (encodeURIComponent("searchFilter." + property), encodeURIComponent(value));
            } else {
              if (typeof (value) === 'object') {
                for (const innerValue of value) {
                  params = params.append('searchFilter.' + property, innerValue); // (encodeURIComponent("searchFilter." + property), encodeURIComponent(value));
                }
              } else {
                params = params.append('searchFilter.' + property, value); // (encodeURIComponent("searchFilter." + property), encodeURIComponent(value));
              }
            }
          }
        }
      }
    }
    return params;
  }
  clearComponent(datatableIndex: number = -1) {
    if (datatableIndex < 0) {
      for (let i = 0; i < this.globals.dataTableInfos.length; i++) {
        const dtInfo = this.getDataTableInfo(i);
        if (dtInfo) {
          const datatableInfo = dtInfo;
          datatableInfo.datatable = null;
          datatableInfo.cols = null;
          datatableInfo.totalRecords = null;
          datatableInfo.selectedColumns = null;
          datatableInfo.displayGrid = false;
          datatableInfo.searchFilter = {};
          setTimeout(() => {
            datatableInfo.loading = true;
          }, 0);
        }
      }
      for (let i = 0; i < this.globals.dataTableInfos.length; i++) {
        if (this.getFilterForm(i)) {
          this.getFilterForm(i).reset();
        }
      }
    } else {
      const dtInfo = this.getDataTableInfo(datatableIndex);
      if (dtInfo) {
        const datatableInfo = dtInfo;
        datatableInfo.datatable = null;
        datatableInfo.cols = null;
        datatableInfo.totalRecords = null;
        datatableInfo.selectedColumns = null;
        datatableInfo.displayGrid = false;
        datatableInfo.searchFilter = null;
        setTimeout(() => {
          this.getDataTableInfo(datatableIndex).loading = true;
        }, 0);
      }
      if (this.getFilterForm(datatableIndex)) {
        this.getFilterForm(datatableIndex).reset();
      }

    }
  }
  clearComponentWitoutForm(datatableIndex: number = -1) {
    if (datatableIndex < 0) {
      for (let i = 0; i < this.globals.dataTableInfos.length; i++) {
        const dtInfo = this.getDataTableInfo(i);
        if (dtInfo) {
          const datatableInfo = dtInfo;
          datatableInfo.datatable = null;
          datatableInfo.cols = null;
          datatableInfo.totalRecords = null;
          datatableInfo.selectedColumns = null;
          datatableInfo.displayGrid = false;
          datatableInfo.searchFilter = {};
          setTimeout(() => {
            datatableInfo.loading = true;
          }, 0);
        }
      }
    } else {
      const dtInfo = this.getDataTableInfo(datatableIndex);
      if (dtInfo) {
        const datatableInfo = dtInfo;
        datatableInfo.datatable = null;
        datatableInfo.cols = null;
        datatableInfo.totalRecords = null;
        datatableInfo.selectedColumns = null;
        datatableInfo.displayGrid = false;
        datatableInfo.searchFilter = null;
        setTimeout(() => {
          this.getDataTableInfo(datatableIndex).loading = true;
        }, 0);
      }
    }
  }
  getSearchFilter(datatableIndex: number = 0): any {
    const dtInfo = this.getDataTableInfo(datatableIndex);
    if (this.getFilterForm(datatableIndex)) {
      // eslint-disable-next-line guard-for-in
      for (const key in this.getFilterForm(datatableIndex).controls) {
        if (this.isNullOrUndefined(dtInfo.searchFilter[key])) {
          this.getDataTableInfo(datatableIndex).searchFilter[key] = '';
        }
      }
    }
    
    return dtInfo.searchFilter;
  }
  clearFilters(datatableIndex: number = 0, ignoredProperties: string[] = []) {
    const dd = this.getFilterForm(datatableIndex);
    if (dd !== undefined && dd !== null) {
      // Formun property i disabled değilse resetliyor
      Object.keys(dd.controls).forEach((control: string) => {
        const typedControl: AbstractControl = dd.controls[control];
        if (!typedControl.disabled) {
          typedControl.reset();
        }
      });
    }
    // }

    const datatableInfo = this.getDataTableInfo(datatableIndex);
    if (datatableInfo.datatable) {
      this.getDataTableInfo(datatableIndex).datatable.first = 0;
      this.getDataTableInfo(datatableIndex).datatable.sortField = '';
      this.getDataTableInfo(datatableIndex).datatable.sortOrder = 1;
      this.getDataTableInfo(datatableIndex).datatable.rows = 10;
      if (ignoredProperties.length > 0) {
        for (const prop of Object.keys(datatableInfo.searchFilter)) {
          if (!ignoredProperties.includes(prop)) {
            delete this.getDataTableInfo(datatableIndex).searchFilter[prop];
          }
        }
      } else {
        this.getDataTableInfo(datatableIndex).searchFilter = {};
      }

      this.getDataTableInfo(datatableIndex).datatable.reset();
      setTimeout(() => {
        this.getDataTableInfo(datatableIndex).loading = true;
      }, 0);
    }
  }
  getSearchFilterFromFormGroup(filterForm: FormGroup, _datatableIndex: number = 0): any {
    const searchFilter = {};
    for (const control in filterForm.controls) {
      if (filterForm.controls.hasOwnProperty(control)) {
        let valueOfControl = filterForm.controls[control].value;
        if (!this.isNullOrUndefined(valueOfControl) && valueOfControl.toString().indexOf(' (GMT') > 0) {
          valueOfControl = filterForm.controls[control].value.toLocaleDateString() + ' ' + filterForm.controls[control].value.toLocaleTimeString();
        }
        searchFilter[control] = valueOfControl;
      }
    }
    return searchFilter;
  }

  beforeGridRefresh(datatableIndex: number = 0, searchFilterIgnorance: boolean = false) {
    const datatableInfo = this.getDataTableInfo(datatableIndex);

    if (datatableInfo.gridRefreshMode !== GridRefreshMode.exportExcel) {
      setTimeout(() => {
        this.getDataTableInfo(datatableIndex).loading = true;
      }, 0);
    } else {
      this.ch.showLoader();
    }

    if (datatableInfo.gridRefreshMode === GridRefreshMode.lazyLoad) { // 1. sayfadan 2. sayfaya geçişlerde sayfada değiştirilmiş olan filtreler uygulanmamalı. Bu yüzden lazy load modunda sadece sayfa ilk açıldığında setSearchFilterFromFormGroup metodu çağrılır.
      if (this.isNullOrUndefined(datatableInfo.searchFilter) || Object.keys(datatableInfo.searchFilter).length === 0 || searchFilterIgnorance === true) {
        this.setSearchFilterFromFormGroup(this.getFilterForm(datatableIndex), datatableIndex);
      }
    } else if (datatableInfo.gridRefreshMode === GridRefreshMode.search) {
      this.setSearchFilterFromFormGroup(this.getFilterForm(datatableIndex), datatableIndex);
      this.ilkSayfayaGit(datatableInfo.datatable, datatableIndex);
    }

    setTimeout(() => {
      if (datatableInfo.gridRefreshMode !== GridRefreshMode.exportExcel) {
        if (datatableInfo && datatableInfo.gridData) {
          this.getDataTableInfo(datatableIndex).gridData = null; // Sayfa geçişlerinde önceki sayfadaki gridin kayıtlarının gösterilmemesi için data null'lanıyor.
        }
      }
    }, 0);
  }
  public setSearchFilterFromFormGroup(filterForm: FormGroup, datatableIndex: number = 0) {
    this.getDataTableInfo(datatableIndex).searchFilter = {};
    if (filterForm) {
      for (const control in filterForm.controls) {
        if (filterForm.controls.hasOwnProperty(control)) {
          let valueOfControl = filterForm.controls[control].value;
          if (!this.isNullOrUndefined(valueOfControl) && valueOfControl.toString().indexOf(' (GMT') > 0) {
            if (filterForm.controls[control].value instanceof Array) {
              const valueControlArray = new Array();
              filterForm.controls[control].value.forEach((item) => {
                valueOfControl = item.toLocaleDateString() + ' ' + item.toLocaleTimeString();
                valueControlArray.push(valueOfControl);
              });
              valueOfControl = valueControlArray;
            } else {
              valueOfControl = filterForm.controls[control].value.toLocaleDateString() + ' ' + filterForm.controls[control].value.toLocaleTimeString();
            }

          }
          this.getDataTableInfo(datatableIndex).searchFilter[control] = valueOfControl;
        }
      }
    }
  }
  convertObjectProperty(obj: any, differentPropertyNames: [string[]]) {
    for (const different of differentPropertyNames) {
      obj[different[1]] = obj[different[0]];
      delete obj[different[0]];
    }
    return obj;
  }

  convertArrayProperty(objArray: any[], differentPropertyNames: [string[]]) {
    // eslint-disable-next-line guard-for-in
    for (const i in objArray) {
      this.convertObjectProperty(objArray[i], differentPropertyNames);
    }

    return objArray;
  }

  gridRefresh(data:any) {
   
      data.forEach(data => data.date = new Date(data.date));
      this.beforeGridRefresh();
      const result = {
      data: data,
      message: 200
    }
    this.gridDatabind(result);
  }

  gridDatabind(result: any, datatableIndex: number = 0, propertyConvertion: [string[]] = null) {
    setTimeout(() => {
      if (propertyConvertion != null) {
        result.data = this.ch.convertArrayProperty(result.data, propertyConvertion);
      }

      const datatableInfo = this.getDataTableInfo(datatableIndex);

      if (datatableInfo.gridRefreshMode === GridRefreshMode.exportExcel) {
        const exportObject = [];
        const columns = datatableInfo.cols;

        // eslint-disable-next-line guard-for-in
        for (const i in result.data) {
          const excelRow = {};
          for (const j in columns) {
            if (columns[j]['type'] === 'date') {
              excelRow[columns[j]['header']] = this.dateHelper.convertFormattedDatetime(result.data[i][columns[j]['field']]);
            } else {
              excelRow[columns[j]['header']] = result.data[i][columns[j]['field']];
            }
          }
          exportObject.push(excelRow);
        }
        this.exportExcelFromJson(exportObject);
        this.ch.hideLoader();
      } else {
        this.getDataTableInfo(datatableIndex).gridData = result.data;
        this.getDataTableInfo(datatableIndex).totalRecords = parseInt(!this.isNullOrUndefined(result.message) ? result.message : 0, 10);
        setTimeout(() => {
          this.getDataTableInfo(datatableIndex).loading = false;
        }, 0);
      }
      this.getDataTableInfo(datatableIndex).displayGrid = true;
    }, 0);
  }

  setGridRefreshAsSearch(datatableIndex: number = 0) {
    this.globals.dataTableInfos[datatableIndex].gridRefreshMode = GridRefreshMode.search;
  }

  getDataTableInfo(datatableIndex: number = 0): DatatableInfo {
    const existedDataTableCount = this.globals.dataTableInfos.length; // 0
    for (let index = existedDataTableCount; index <= datatableIndex; index++) {
      if (this.isNullOrUndefined(this.globals.dataTableInfos[index])) {
        this.globals.dataTableInfos.push(new DatatableInfo());
        this.globals.dataTableInfos[index].gridRefreshMode = GridRefreshMode.lazyLoad;
      }
    }
    return this.globals.dataTableInfos[datatableIndex];
  }

  getGridData(datatableIndex: number = 0) {
    const datatableInfo = this.getDataTableInfo(datatableIndex);
    if (datatableInfo && datatableInfo.gridData) {
      return datatableInfo.gridData;
    } else {
      return [];
    }
  }

  getFilterForm(datatableIndex: number = 0): FormGroup {
    return this.getDataTableInfo(datatableIndex).filterForm;
  }

  setFilterForm(filterForm: FormGroup, datatableIndex: number = 0) {
    return this.getDataTableInfo(datatableIndex).filterForm = filterForm;
  }

  createColumns(columnArray, datatableIndex: number = 0) {
    const columns = [];

    for (const arr of columnArray) {
      if (arr !== null) {
        const column = { field: '', header: '' };
        column['field'] = arr[0];
        column['header'] = arr[1];
        if (arr[2] != null) {
          column['type'] = arr[2];
        }
        if (arr[3] != null) {
          column['sortable'] = arr[3];
        }
        columns.push(column);
      }
    }

    this.getDataTableInfo(datatableIndex).cols = columns;
    this.getDataTableInfo(datatableIndex).selectedColumns = this.getDataTableInfo(datatableIndex).cols;
  }

  getValueFromGridData(id: number, propertyName: string, datatableIndex: number = 0) {
    if (id > 0) {
      const kayit = this.getDataTableInfo(datatableIndex).gridData.filter(p => p.id === id);
      if (kayit.length > 0) {
        return kayit[0][propertyName];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  removeGridColumn(columns, silinecekKolonAdlari: string[]): [] {
    const designedColumns = columns.slice();
    for (const silinecekKolonAdi of silinecekKolonAdlari) {
      designedColumns.splice(designedColumns.indexOf((designedColumns.filter(p => p === designedColumns.filter(q => q[0] === silinecekKolonAdi)[0]))[0]), 1);
    }
    return designedColumns;
  }



  ilkSayfayaGit(dt?: Table, datatableIndex: number = 0) {
    if (dt) {
      dt.first = 0;
      this.getDataTableInfo(datatableIndex).datatable.first = 0;
    } else {
      if (this.getDataTableInfo(datatableIndex).datatable !== null && this.getDataTableInfo(datatableIndex).datatable !== undefined) {
        this.getDataTableInfo(datatableIndex).datatable.first = 0;
      }
    }
  }

  sonSayfayaGit(dt?: Table, silmeIslemiMi: boolean = false, datatableIndex: number = 0) {
    if (dt) {
      if (silmeIslemiMi) {
        if (dt.totalRecords % dt.rows === 1) {
          dt.first = (Math.ceil(((dt.totalRecords - 1) / dt.rows)) - 1) * dt.rows;
        }
      } else {
        dt.first = (Math.ceil(((dt.totalRecords + 1) / dt.rows)) - 1) * dt.rows;
      }
    } else {
      const dtInfo = this.getDataTableInfo(datatableIndex);
      if (silmeIslemiMi) {
        if (dtInfo.totalRecords % dtInfo.datatable.rows === 1) {
          this.getDataTableInfo(datatableIndex).datatable.first = (Math.ceil(((dtInfo.totalRecords - 1) / dtInfo.datatable.rows)) - 1) * dtInfo.datatable.rows;
          if (dtInfo.datatable.first < 0) {
            this.getDataTableInfo(datatableIndex).datatable.first = 0;
          }
        }
      } else {
        this.getDataTableInfo(datatableIndex).datatable.first = (Math.ceil(((dtInfo.totalRecords + 1) / dtInfo.datatable.rows)) - 1) * dtInfo.datatable.rows;
      }
    }
  }

isNullOrUndefined(obj: any) {
    if (obj === undefined || obj === null || obj === '' || obj === ' ') {
      return true;
    } else {
      return false;
    }
  }
  get globals() {
    return this.globalVariables;
  }
  exportExcelFromJson(jsonData, columnMapping: any = null, dosyaAdi: string = ''): void {
    if (!this.isNullOrUndefined(columnMapping)) {
      for (const mapping of columnMapping) {
        if (!this.isNullOrUndefined(mapping[2])) {
          for (const obj of jsonData) {
            if (mapping[2] === ColumnType.date) {
              obj[mapping[0]] = !this.isNullOrUndefined(obj[mapping[0]]) ? this.dateHelper.convertFormattedDate(obj[mapping[0]]) : '';
            } else if (mapping[2] === ColumnType.dateTime) {
              obj[mapping[0]] = !this.isNullOrUndefined(obj[mapping[0]]) ? this.dateHelper.convertFormattedDatetime(obj[mapping[0]]) : '';
            }
          }
        }
      }
      this.ch.convertArrayProperty(jsonData, columnMapping);
    }

    let fileName = '';
    if (!this.ch.isNullOrWhiteSpace(dosyaAdi)) {
      fileName = dosyaAdi + '.xlsx';
    } else {
      fileName = this.ch.createGuid() + '.xlsx';
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData, { dateNF: 'dd.MM.yyyy' });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sayfa1');

    XLSX.writeFile(wb, fileName);
  }

  exportExcelFromJsonWithTitle(jsonData, columnMapping: any = null, dosyaAdi: string = '', title: string = ''): void {
    if (!this.isNullOrUndefined(columnMapping)) {
      for (const mapping of columnMapping) {
        if (!this.isNullOrUndefined(mapping[2])) {
          for (const obj of jsonData) {
            if (mapping[2] === ColumnType.date) {
              obj[mapping[0]] = !this.isNullOrUndefined(obj[mapping[0]]) ? this.dateHelper.convertFormattedDate(obj[mapping[0]]) : '';
            } else if (mapping[2] === ColumnType.dateTime) {
              obj[mapping[0]] = !this.isNullOrUndefined(obj[mapping[0]]) ? this.dateHelper.convertFormattedDatetime(obj[mapping[0]]) : '';
            }
          }
        }
      }
      this.ch.convertArrayProperty(jsonData, columnMapping);
    }

    let fileName = '';
    if (!this.ch.isNullOrWhiteSpace(dosyaAdi)) {
      fileName = dosyaAdi + '.xlsx';
    } else {
      fileName = this.ch.createGuid() + '.xlsx';
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{}], { dateNF: 'dd.MM.yyyy' });
    XLSX.utils.sheet_add_json(ws, jsonData, { origin: 'A2' });
    XLSX.utils.sheet_add_json(ws, [{}], { header: [title + ' - ' + this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss')], origin: 'A1' });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sayfa1');
    XLSX.writeFile(wb, fileName);
  }

    /**
   * @tanim Detaya Gönderilirken Kullanılır.
   * @param url gelen url
   */
    setLocaleStorageForBack(url: string) {
      localStorage.setItem('url', url);
      localStorage.setItem('geriGel', 'false');
      localStorage.setItem('form', JSON.stringify(this.getFilterForm().value));
    }
}