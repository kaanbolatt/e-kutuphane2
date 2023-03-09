import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-ulke',
  templateUrl: './ulke.component.html'
})
export class UlkeComponent extends BaseComponent implements OnInit {

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Input() parentForm;
  @Input() id: string;
  @Input() baslangicSecenekTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() turkiyeBastaOlsunMu = false;

  @Input() disabled = false;
  ulkeTanimlariFiltre: SelectItem[];
  constructor() {
    super();
  }

  ngOnInit() {
    this.getUlkeTanimlari();
  }

  getUlkeTanimlari() {
    this.cs.getUlkeTanimlari().subscribe(result => {
      if (this.ch.checkResult(result)) {
        if (this.baslangicSecenekTuru === 1) {
          if (this.turkiyeBastaOlsunMu === true) {
            this.ulkeTanimlariFiltre = this.ch.addUnselectedItem(result.data.filter(p => p.value === 8890), 1);
            this.ulkeTanimlariFiltre = this.ulkeTanimlariFiltre.concat(result.data.filter(p => p.value !== 8890));
          } else {
            this.ulkeTanimlariFiltre = this.ch.addUnselectedItem(result.data, 1);
          }
        } else {
          if (this.turkiyeBastaOlsunMu === true) {
            this.ulkeTanimlariFiltre = this.ch.addUnselectedItem(result.data.filter(p => p.value === 8890), 2);
            this.ulkeTanimlariFiltre = this.ulkeTanimlariFiltre.concat(result.data.filter(p => p.value !== 8890));
          } else {
            this.ulkeTanimlariFiltre = this.ch.addUnselectedItem(result.data, 2);
          }
        }
      }
    });
  }

  onChange(value) {
    this.change.emit(value);
  }

}
