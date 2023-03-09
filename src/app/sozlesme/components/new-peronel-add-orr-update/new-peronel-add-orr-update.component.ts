import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-peronel-add-orr-update',
  templateUrl: './new-peronel-add-orr-update.component.html',
  styleUrls: ['./new-peronel-add-orr-update.component.scss']
})
export class NewPeronelAddOrrUpdateComponent implements OnInit {
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
