import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonHelper } from '../../helpers/common-helper';

@Component({
  selector: 'app-sms-dialog',
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.scss']
})
export class SmsDialogComponent {

  @Input() display: boolean;
  @Input() startTimer: boolean = false;
  @Input() correctCode: string;
  @Input() isWrong: string;

  @Output() displayFalser = new EventEmitter();
  @Output() timerFin = new EventEmitter();
  @Output() smsValueEvent = new EventEmitter<string>();

  smsValue: string = '';
  reSendButton: boolean = false
  constructor(
    public ch: CommonHelper
  ) { }

  falser() {
    this.displayFalser.emit();
    this.smsValue = ""
  }

  verifyPhoneKeyUp() {
    if (this.smsValue.length > 5) {
      this.smsValueEvent.emit(this.smsValue);
    }
  }


  verifyPhone() {
    this.smsValueEvent.emit(this.smsValue);
  }

  timeFinish() {
    this.reSendButton = true
    // this.timerFin.emit();
  }

  reSend() {
    this.reSendButton = false;
  }
}
