import { Directive, Input } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { CommonHelper } from '../helpers/common-helper';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'p-calendar'
})

export class CalendarDirective {

  @Input() todayButtonStyleClass = 'p-button-info ml5';
  constructor(calendar: Calendar, public ch: CommonHelper) {
    calendar.dateFormat = 'dd.mm.yy';
    calendar.locale = {
      firstDayOfWeek: 1,
      dayNames: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      dayNamesShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
      dayNamesMin: ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'],
      monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
      monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
      today: 'Bugün',
      clear: 'Temizle'
    };
    calendar.autoZIndex = true;
    calendar.baseZIndex = 100000;
    calendar.appendTo = 'body';
    calendar.readonlyInput = true;
    calendar.showIcon = true;
    calendar.yearNavigator = true;
    calendar.yearRange = '1900:2030';
    calendar.monthNavigator = true;
    calendar.showButtonBar = true;
    calendar.todayButtonStyleClass = this.todayButtonStyleClass;
    calendar.clearButtonStyleClass='p-button-danger mr5';
    calendar.firstDayOfWeek = 1;
    calendar.selectOtherMonths = true;
  }
}
