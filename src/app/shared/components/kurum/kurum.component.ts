import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-kurum',
  templateUrl: './kurum.component.html'
})

export class KurumComponent extends BaseComponent implements OnInit {
  @Input() id: string;
  @Input() ilceKodu: string;
  @Input() kurumTuruKodu: string; // Ekranda kurum türü combobox'ı varken otomatik olarak doldurulur. Bu input'a herhangi bir parametre yollanmamalıdır.
  @Input() kurumTuruKoduList: []; // Ekranda kurum türü combobox'ı yokken parametre olarak kurum türü listesi vermek için kullanılır.
  @Input() baslangicSecenekTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input()
  set parentForm(value) {
    this._parentForm = value;
  }
  _parentForm;
  kurumlar: SelectItem[];

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.ch.isNullOrUndefined(this.kurumTuruKodu) && !this.ch.isNullOrUndefined(this.ilceKodu)) {
      this._parentForm.get(this.kurumTuruKodu).valueChanges.subscribe(ktk => {
        if (ktk > 0) {
          this.getKurumTanimlari();
        } else {
          this.setUnselectedItem([]);
          this._parentForm.controls[this.id].value = '';
          this._parentForm.controls[this.id].disable();
        }
      });
    } else if (!this.ch.isNullOrUndefined(this.ilceKodu)) {
      this._parentForm.get(this.ilceKodu).valueChanges.subscribe(ik => {
        if (ik > 0) {
          this.getKurumTanimlari();
        } else {
          this.setUnselectedItem([]);
          this._parentForm.controls[this.id].value = '';
          this._parentForm.controls[this.id].disable();
        }
      });

    }
    this._parentForm.controls[this.id].disable();
    this.setUnselectedItem([]);
  }

  getKurumTanimlari() {
    const ilceKodu = this._parentForm.controls[this.ilceKodu].value;
    const kurumTuruKodu = !this.ch.isNullOrUndefined(this.kurumTuruKodu) ? this._parentForm.controls[this.kurumTuruKodu].value : null;

    if (this.ch.isNullOrUndefined(this.kurumTuruKodu)) { // formda kurum turu olmayan durumlar için
      if (this.ch.isNullOrWhiteSpace(ilceKodu)) {
        this._parentForm.controls[this.id].disable();
        this.setUnselectedItem([]);
      } else {
        this._parentForm.controls[this.id].enable();
      }
      if (this.kurumTuruKoduList && this.kurumTuruKoduList.length > 0) {  //  Ekranda kurum türü combobox'ı yokken parametre olarak kurum türü listesi verildiğinde
        if (!this.ch.isNullOrWhiteSpace(ilceKodu)) {
          this.cs.getKurumTanimlari(null, this._parentForm.controls[this.ilceKodu].value, this.kurumTuruKoduList).subscribe(result => {
            if (this.ch.checkResult(result)) {
              this.setUnselectedItem(result.data);
            }
          });
        }
      } else {
        if (!this.ch.isNullOrWhiteSpace(ilceKodu)) {
          this.cs.getKurumTanimlari(null, this._parentForm.controls[this.ilceKodu].value, null).subscribe(result => {
            if (this.ch.checkResult(result)) {
              this.setUnselectedItem(result.data);
            }
          });
        }
      }
    } else {  // formda kurum turu olan durumlar için
      if (typeof (kurumTuruKodu) === 'number') { // tek kurum türü seçimi
        if (this.ch.isNullOrWhiteSpace(this._parentForm.controls[this.kurumTuruKodu].value)) {
          return;
        } else {
          if (this.ch.isNullOrWhiteSpace(this._parentForm.controls[this.ilceKodu].value)) {
            this.setUnselectedItem([]);
          } else {
            this._parentForm.controls[this.id].enable();
          }
          if (!this.ch.isNullOrWhiteSpace(ilceKodu)) {
            this.cs.getKurumTanimlari(null, this._parentForm.controls[this.ilceKodu].value, [this._parentForm.controls[this.kurumTuruKodu].value]).subscribe(result => {
              if (this.ch.checkResult(result)) {
                this.setUnselectedItem(result.data);
              }
            });
          }
        }
      } else { // multiple kurum türü seçimi
        if (this.ch.isNullOrWhiteSpace(this._parentForm.controls[this.ilceKodu].value)) {
          this._parentForm.controls[this.id].enable();
        } else {
          if (!this.ch.isNullOrWhiteSpace(kurumTuruKodu) && kurumTuruKodu.length === 0) {
            this._parentForm.controls[this.id].disable();
            this.setUnselectedItem([]);
          } else {
            this._parentForm.controls[this.id].enable();
          }
          if (!this.ch.isNullOrWhiteSpace(kurumTuruKodu) && kurumTuruKodu.length > 0) {
            const seciliKurumTurleri = this._parentForm.controls[this.kurumTuruKodu].value as number[];
            this.cs.getKurumTanimlari(null, this._parentForm.controls[this.ilceKodu].value, seciliKurumTurleri).subscribe(result => {
              if (this.ch.checkResult(result)) {
                this.setUnselectedItem(result.data);
              }
            });
          }
        }
      }
    }
  }

  setUnselectedItem(kurumData) {
    if (this.baslangicSecenekTuru === 1) {
      this.kurumlar = this.ch.addUnselectedItem(kurumData, 1);
    } else {
      this.kurumlar = this.ch.addUnselectedItem(kurumData, 2);
    }
  }
}
