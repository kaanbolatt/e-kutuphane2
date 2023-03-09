import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {

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
