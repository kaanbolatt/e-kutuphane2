import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/bases/base.component';

@Component({
  selector: 'app-firma-islemleri-add-or-update',
  templateUrl: './firma-islemleri-add-or-update.component.html',
  styleUrls: ['./firma-islemleri-add-or-update.component.scss']
})
export class FirmaIslemleriAddOrUpdateComponent  implements OnInit {
  @Input() display:boolean = true;
  @Output() displayFalser=new EventEmitter()

  
  constructor() { }

  ngOnInit(): void {
  }
  displayFalse(){
this.displayFalser.emit();
this.display=false
  }
}
