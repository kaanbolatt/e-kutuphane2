import { Component, Input, forwardRef, EventEmitter, Output, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpHelper } from '../../../core/services/http-helper.service';
import { BaseComponent } from '../../bases/base.component';
@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  providers:
    [{
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutoCompleteComponent),
    }],
})
export class AutoCompleteComponent extends BaseComponent implements OnInit {
  @Output() select = new EventEmitter();
  @Output() unSelect = new EventEmitter();
  @Output() removeItemForReadonly = new EventEmitter();
  @Input() controllerName: string;
  @Input() customParamsName: string;
  @Input() customParamsValue: string;
  @Input() placeholder: string;
  @Input() methodName: string;
  @Input() searchParams = {};
  @Input() id: string;
  @Input() _value: any;
  @Input() multiple = false;
  @Input() readonly = false;
  @Input() showNewAdd = false;
  @Input() filteredObjects: any[] = [];
  @Input() editValue: any; // Edit işlemleri için

  @Input()
  set parentForm(value) {
    this._parentForm = value;
  }
  _parentForm;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  constructor(
    private httpHelper: HttpHelper
  ) {
    super();
  }

  ngOnInit(): void {
    // İf readonly mode is active ,the place holder shouldn't kepp any mesaages.
    if (!this.readonly && this.placeholder == undefined) {
      this.placeholder = 'Lütfen açıklayıcı etiketler ekleyin';
    }
  }

  search(event) {
    // bazen component tarafında sedece gösterim için kullanılmıştır.
    if (!this.readonly) {
      this.searchParams['search'] = event.query;
      this.searchParams[this.customParamsName] = this.customParamsValue;
      this.httpHelper.get(this.controllerName, this.methodName, this.gh.createParams(this.searchParams))
        .toPromise()
        .then(res => res.data as any[])
        .then(result => {

          if (result.length == 0 && this.showNewAdd) {
            this.filteredObjects = [{ value: -999, label: event.query, title: null }];
          } else {
            this.filteredObjects = result;
          }
        });
    }
  }

  onSelect(value) {
    if (!this.multiple && this._parentForm != undefined) {
      this._parentForm.controls[this.id].value = value['value'];
    }
    this.select.emit(value);
  }

  onUnSelect(value) {
    this.unSelect.emit(value);
  }

  removeItemForReadonlyMode($event) {
    this.removeItemForReadonly.emit($event);
  }
}
