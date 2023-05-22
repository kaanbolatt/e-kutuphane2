import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { HttpHelper } from 'src/app/core/services/http-helper.service';
import { BaseComponent } from '../../bases/base.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './app-dropdown.component.html',
})
export class AppDropdownComponent extends BaseComponent implements ControlValueAccessor,OnInit {

  @Output() change = new EventEmitter();
  @Input() controllerName: string;
 
  @Input() init:boolean=false;
  @Input() placeholder = 'Metni girmeye başlayın...';
  @Input() methodName: string;
  @Input() searchParams = {};
  @Input() id: string;
  @Input() _value: any;

  @Input() multiple = false;
  @Input() optionValue = "value";
  @Input() secondCheck=false;
  @Input() takeLabel=false;
 needSecondCheck=0;
  @Input() filteredObjects: any[] = [];
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
  ngOnInit(): void {
    
    if(this.filteredObjects.length==0&&this.init==true){


      this.httpHelper.get(this.controllerName, this.methodName, this.gh.createParams(this.searchParams))
        .toPromise()
        .then(res => res.data as any[])
        .then(result => {
          this.filteredObjects = result;
        });
    }
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


  search() {
    const isNullOrUndefined =Object.keys(this.searchParams).length
    if((this.filteredObjects.length==0||isNullOrUndefined!=0)&&this.needSecondCheck<1){
      
      this.httpHelper.get(this.controllerName, this.methodName, this.gh.createParams(this.searchParams))
        .toPromise()
        .then(res => res.data as any[])
        .then(result => {
          
          const index = result.findIndex(object => {
            return object.label === "ASM";
          });
               result.splice(index,1)
          this.filteredObjects = result;
        });
        if(this.secondCheck==true){
          this.needSecondCheck++;
        }
    }
 
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
    
    
   
      if ( value['value'].value!=undefined) {
        this._parentForm.controls[this.id].value = value['value'].value;
      }else{
        this._parentForm.controls[this.id].value = value['value'];
      }
    
 
   
    this.change.emit(value);
  }

}
