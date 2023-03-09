import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import { SelectItem } from 'primeng/api';
import { IlceComponent } from '../ilce/ilce.component';

@Component({
  selector: 'app-il',
  templateUrl: './il.component.html'
})

export class IlComponent extends BaseComponent implements OnInit {
  @Input() id: string;
  @Input() ilceKodu: string;
  @Input() kurumTuruKodu: string;
  @Input() kurumKodu: string;
  @Input() bolgeKodu: string;
  @Input() readonly = false;
  @Input() baslangicSecenekTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Input() multiple = false;
  @Input() defaultLabelTuru = 1; // 1:Lütfen Seçiniz, 2: Tümü
  @Output() secilenIl: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  set parentForm(value) {
    this._parentForm = value;
  }
  _parentForm;

  defaultLabel: string;
  ilTanimlariFiltre: SelectItem[];

  constructor(public ilceComp: IlceComponent) {
    super();
  }

  ngOnInit() {
    if (this.bolgeKodu !== undefined) {
      this._parentForm.get(this.bolgeKodu).valueChanges.subscribe(_ik => {
        this.getIlTanimlari();
      });
    }
    this.getIlTanimlari();
  }

  getIlTanimlari() {
    let bolgeKodu: number;
    if (this.bolgeKodu !== undefined) {
      bolgeKodu = Number(this._parentForm.controls[this.bolgeKodu].value);
    }

    this.cs.getIlTanimlari(bolgeKodu).subscribe(result => {
      if (this.ch.checkResult(result)) {
        if (this.multiple === false) {
          if (this.baslangicSecenekTuru === 1) {
            this.ilTanimlariFiltre = this.ch.addUnselectedItem(result.data, 1);
          } else {
            this.ilTanimlariFiltre = this.ch.addUnselectedItem(result.data, 2);
          }
          this.onIlChange(this._parentForm.getRawValue().ilKodu);
        } else {
          this.ilTanimlariFiltre = result.data;
          if (this.defaultLabelTuru === 1) {
            this.defaultLabel = 'Lütfen Seçiniz';
          } else {
            this.defaultLabel = 'Tümü';
          }
        }
      }
    });
  }

  onIlChange(ilKodu) {
    if (this._parentForm.controls[this.ilceKodu]) {
      this._parentForm.controls[this.ilceKodu].reset();
    }
    if (this._parentForm.controls[this.kurumTuruKodu]) {
      this._parentForm.controls[this.kurumTuruKodu].reset();
    }
    if (this._parentForm.controls[this.kurumKodu]) {
      this._parentForm.controls[this.kurumKodu].reset();
    }
    // secilen il kodu burda parent companente event ile gönderilmektedir
    this.secilenIl.emit(ilKodu);
  }
}
