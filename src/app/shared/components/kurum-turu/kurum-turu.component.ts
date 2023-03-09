import { SelectItem } from 'primeng/api';
import { Component, OnInit, Input } from '@angular/core';
import { KurumComponent } from '../kurum/kurum.component';
import { BaseComponent } from '../../../shared/bases/base.component';

@Component({
  selector: 'app-kurum-turu',
  templateUrl: './kurum-turu.component.html'
})
export class KurumTuruComponent extends BaseComponent implements OnInit {

  @Input() id: string;
  @Input() ilceKodu: string;
  @Input() kurumKodu: string;
  @Input() baslangicSecenekTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() multiple = false;
  @Input() defaultLabelTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() customKurumTurleri: number[];
  @Input() parentForm;
  defaultLabel: string;
  kurumTuruTanimlariFiltre: SelectItem[];

  constructor(public kurumComp: KurumComponent) {
     super();
     }

  ngOnInit() {
    this.getKurumTurleri();
  }

  getKurumTurleri() {
    this.cs.getKurumTuruTanimlari().subscribe(result => {
      if (this.ch.checkResult(result)) {
        if (this.customKurumTurleri && this.customKurumTurleri.length > 0) {
          result.data = result.data.filter(p => this.customKurumTurleri.includes(Number(p.value)));
        }
        if (this.multiple === false) {
          this.setUnselectedItem( result.data);
        } else {
          this.kurumTuruTanimlariFiltre = result.data;
          if (this.defaultLabelTuru === 1) {
            this.defaultLabel = 'Lütfen Seçiniz';
          } else {
            this.defaultLabel = 'Tümü';
          }
        }
      }
    });
  }

  setUnselectedItem(kurumTuruData) {
    if (this.baslangicSecenekTuru === 1) {
      this.kurumTuruTanimlariFiltre = this.ch.addUnselectedItem(kurumTuruData, 1);
    } else {
      this.kurumTuruTanimlariFiltre = this.ch.addUnselectedItem(kurumTuruData, 2);
    }
  }

  onKurumTuruChange() {
    if (this.parentForm.controls[this.kurumKodu]) {
      this.parentForm.controls[this.kurumKodu].reset();
    }
  }
}
