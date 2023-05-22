import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { KutuphaneService } from 'src/app/sozlesme/services/kutuphane.service';

@Component({
  selector: 'app-add-birim',
  templateUrl: './add-birim.component.html',
  styleUrls: ['./add-birim.component.scss']
})
export class AddBirimComponent extends BaseComponent implements OnInit {
  unitForm: FormGroup;

  constructor(private kutuphaneService: KutuphaneService) { super() }

  ngOnInit(): void {
    this.createUnitForm();
  }

  createUnitForm() {
    this.unitForm = this.gh.formBuilder.group({
      id: [0],
      unitName: ['', Validators.required],
    });
  }

  get unitName() { return this.unitForm.get('unitName') }

  saveUnit() {
    const data = this.unitForm.getRawValue();
    this.kutuphaneService.addUnit(data).subscribe(result => {
      if (this.ch.checkResult(result)) {
        this.ch.messageHelper.showSuccessMessage(result.message);
      }
    });
  }


}
