import { Directive } from '@angular/core';
import { FullCalendar } from 'primeng/fullcalendar';

@Directive({
  selector: 'p-fullCalendar'
})

export class FullCalendarDirective {
    constructor(_fullCalendar: FullCalendar) {
    }
}
