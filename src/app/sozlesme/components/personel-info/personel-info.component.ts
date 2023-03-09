import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personel-info',
  templateUrl: './personel-info.component.html',
  styleUrls: ['./personel-info.component.scss']
})
export class PersonelInfoComponent implements OnInit {

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
