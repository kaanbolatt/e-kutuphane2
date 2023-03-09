import { Directive } from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';

@Directive({
  selector: 'p-multiSelect'
})

export class MultiSelectDirective {
  constructor(multiSelect: MultiSelect) {
    multiSelect.autoZIndex = true;
    multiSelect.baseZIndex = 100000;
    multiSelect.appendTo = 'body';
    multiSelect.defaultLabel = 'Lütfen Seçiniz';
    multiSelect.selectedItemsLabel = '{0} öğe seçildi';
  }
}

