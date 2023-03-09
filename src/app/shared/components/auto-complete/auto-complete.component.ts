import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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
export class AutoCompleteComponent extends BaseComponent implements ControlValueAccessor {
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter();
  @Input() controllerName: string;
  @Input() dropDown: boolean=true;
  @Input() field: string;
  @Input() placeholder = 'Metni girmeye başlayın...';
  @Input() methodName: string;
  @Input() searchParams = {};
  @Input() id: string;
  @Input() _value: any;
  @Input() multiple = false;

  filteredObjects: any[] = [];
  isDisabled = false;
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
    this._onChange(this._value);
  }

  constructor(private httpHelper: HttpHelper) {
    super();
  }
  _onChange(_value: any) {
    return;
  }

  onTouched() {
  }

  set selectedItem(seciliNesne) {
    if (this.filteredObjects.length > 0 && !this.ch.isNullOrUndefined(this.filteredObjects.filter(p => p.label === seciliNesne.label)[0])) {
      const selectedValue = this.filteredObjects.filter(p => p.label === seciliNesne.label)[0].value;
      this.value = selectedValue;
    }
  }


  search(event) {
    
    this.searchParams['search'] = event.query;

    this.httpHelper.get(this.controllerName, this.methodName, this.gh.createParams(this.searchParams))
      .toPromise()
      .then(res => res.data as any[])
      .then(result => {
        this.filteredObjects = result;
      });
  }

  writeValue(value) {  
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this._onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled) {
    this.isDisabled = isDisabled;
  }

  onSelect(value) {
    if (!this.multiple) {
      this._parentForm.controls[this.id].value = value['value'];
     console.log(this._parentForm.value) ;
    }
    this.select.emit(value);
  }
}
