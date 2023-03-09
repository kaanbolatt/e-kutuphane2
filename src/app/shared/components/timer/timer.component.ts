import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnChanges {

  @Input() duration = 60 * 2;
  @Input() start = false;
  @Output() timerFinished: EventEmitter<boolean> = new EventEmitter<false>();
  geriSayim = '';
  intervalId: NodeJS.Timeout;
  constructor() { }

  ngOnChanges(): void {
    if (this.start) {
      this.startTimer(this.duration);
    } else {
      clearInterval(this.intervalId);
      this.geriSayim = '00:00';
    }
  }

  startTimer(duration: number) {
    let timer = duration;
    let minutes = '';
    let seconds = '';

    this.intervalId = setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10).toString();
      seconds = parseInt((timer % 60).toString(), 10).toString();

      minutes = Number(minutes) < 10 ? '0' + minutes : minutes;
      seconds = Number(seconds) < 10 ? '0' + seconds : seconds;

      this.geriSayim = minutes + ':' + seconds;

      if (--timer < 0) {
        clearInterval(this.intervalId);
        this.timerFinished.emit();
      }
    }, 1000);
  }
}
