import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-vpn',
  templateUrl: './add-vpn.component.html',
  styleUrls: ['./add-vpn.component.scss']
})
export class AddVpnComponent implements OnInit {

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
