import { Directive } from '@angular/core';
import { Menu } from 'primeng/menu';

@Directive({
  selector: 'p-menu'
})

export class MenuDirective {
  constructor(menu: Menu) {
    menu.appendTo = 'body';
  }
}
