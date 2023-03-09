import { Directive } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'p-dropdown'
})

export class DropdownDirective {
  constructor(dropdown: Dropdown) {
    dropdown.filter = true;
    dropdown.resetFilterOnHide = true;
    dropdown.autoZIndex = true;
    dropdown.baseZIndex = 100000;
    dropdown.emptyFilterMessage = 'Sonuç Bulunamadı';
    dropdown.appendTo = 'body';
    dropdown.panelStyle = { width: '0px' };
  }
}
