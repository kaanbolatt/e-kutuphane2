import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-yil',
  templateUrl: './yil.component.html'
})

export class YilComponent extends BaseComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Input() parentForm;
  @Input() id: string;
  @Input() baslangic = 2016;
  @Input() bitis = 2030;
  @Input() baslangicSecenekTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() baslangicSecenekMetni = '';
  @Input() azalanSiralama = false;
  yillar: SelectItem[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    const yillar = [];
    for (let i = this.baslangic; i <= this.bitis; i++) {
      yillar.push({ label: i.toString(), value: i });
    }

    if (this.azalanSiralama === true) {
      yillar.reverse();
    }

    this.yillar = this.ch.addUnselectedItem(yillar, this.baslangicSecenekTuru, this.baslangicSecenekMetni);
  }

  onChange(value) {
    this.change.emit(value);
  }
}
