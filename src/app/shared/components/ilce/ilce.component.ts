import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import { SelectItem } from 'primeng/api';
import { KurumComponent } from '../kurum/kurum.component';

@Component({
  selector: 'app-ilce',
  templateUrl: './ilce.component.html'
})

export class IlceComponent extends BaseComponent implements OnInit, OnChanges {
  @Output() secilenIlce: EventEmitter<number> = new EventEmitter<number>();
  @Input() id: string;
  @Input() ilKodu: string;
  @Input() kurumKodu: string;
  @Input() kurumTuruKodu: string;
  @Input() placeholder = 'Lütfen Seçiniz';
  @Input() baslangicSecenekTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() multiple = false;
  @Input() defaultLabelTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() degisenIlKodlari: any;
  @Input()
  set parentForm(value) {
    this._parentForm = value;
  }
  _parentForm;

  defaultLabel: string;
  selectedIlce: any;
  ilceler: SelectItem[];

  constructor(public kurumComp: KurumComponent) {
    super();
  }

  ngOnInit() {
    this._parentForm.get(this.ilKodu).valueChanges.subscribe(ik => {
      if (!this.ch.isNullOrWhiteSpace(ik)) {
        this.getIlceTanimlari(null);
      } else { // İl - İlçe Temizlenirse
        this.ilceler = this.ch.addUnselectedItem([], 1);
        this._parentForm.controls[this.id].value = '';
        this._parentForm.controls[this.id].disable();
      }
    });
    if (!this.ch.isNullOrWhiteSpace(this._parentForm.controls[this.id].value)) {
      this.getIlceTanimlari(this._parentForm.controls[this.ilKodu].value);
      this._parentForm.controls[this.id].enable();
      this.setUnselectedItem([]);
    } else { // İl - İlçe Seçimi Açılışta
      this.setUnselectedItem([]);
      this._parentForm.controls[this.id].disable();
    }
  }

  getIlceTanimlari(degisenIlKodlari: any) {
    let ilKodu: any;
    if (!this.ch.isNullOrWhiteSpace(degisenIlKodlari)) {
      ilKodu = degisenIlKodlari;
    } else {
      ilKodu = this._parentForm.controls[this.ilKodu].value;
    }
    if (typeof (ilKodu) === 'number' || this.ch.isNullOrWhiteSpace(ilKodu)) { // tek il seçimi
      if (this.ch.isNullOrWhiteSpace(ilKodu)) {
        this.setUnselectedItem([]);
        this._parentForm.controls[this.id].disable();
      } else {
        this._parentForm.controls[this.id].enable();
      }
      if (!this.ch.isNullOrWhiteSpace(ilKodu)) {
        this.cs.getIlceTanimlari(Number(ilKodu)).subscribe(result => {
          if (this.ch.checkResult(result)) {
            if (this.multiple === true) {
              this.ilceler = result.data;
              if (this.defaultLabelTuru === 1) {
                this.defaultLabel = 'Lütfen Seçiniz';
              } else {
                this.defaultLabel = 'Tümü';
              }
            } else {
              this.setUnselectedItem(result.data);
            }
          }
        });
      }
    } else { // multiple il seçimi
      if (ilKodu.length === 0) {
        this._parentForm.controls[this.id].disable();
        this.setUnselectedItem([]);
      }
      if (ilKodu.length > 0) {
        this.cs.getIlceTanimlariByIlList(ilKodu).subscribe(result => {
          if (this.ch.checkResult(result)) {
            if (this.multiple === true) {
              this.ilceler = result.data;
              if (this.defaultLabelTuru === 1) {
                this.defaultLabel = 'Lütfen Seçiniz';
              } else {
                this.defaultLabel = 'Tümü';
              }
            } else {
              this.setUnselectedItem(result.data);
            }
          }
        });
      }
    }
  }

  setUnselectedItem(ilceData) {
    if (this.baslangicSecenekTuru === 1) {
      this.ilceler = this.ch.addUnselectedItem(ilceData, 1);
    } else {
      this.ilceler = this.ch.addUnselectedItem(ilceData, 2);
    }
  }

  onIlceChange(ilceKodu) {
    if (this._parentForm.controls[this.kurumKodu]) {
      this._parentForm.controls[this.kurumKodu].reset();
    }
    if (this._parentForm.controls[this.kurumTuruKodu]) {
      this._parentForm.controls[this.kurumTuruKodu].reset();
    }
    this.secilenIlce.emit(ilceKodu);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.degisenIlKodlari !== undefined) {
      this.getIlceTanimlari(changes.degisenIlKodlari.currentValue);
    } else {
      this.getIlceTanimlari(null);
    }
  }
}
