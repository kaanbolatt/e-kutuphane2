import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { FirstItemTextType } from 'src/app/shared/enums/first-item-text-type.enum';
import { UserType, userTypeDescriptions } from 'src/app/shared/enums/user-types.enum';
import { KutuphaneService } from 'src/app/sozlesme/services/kutuphane.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseComponent implements OnInit {
  userType = [];
  userForm: FormGroup;
  unitList = [];

  constructor(private accountService: AccountService, private kutuphaneService: KutuphaneService) { super() }


  ngOnInit(): void {
    this.createUserForm();
    this.startedData();
  }

  startedData() {
    const userTypeList = this.ch.enumToSelectItemArray(UserType, userTypeDescriptions, []);
    this.userType = this.ch.addUnselectedItem(userTypeList, FirstItemTextType.pleaseSelect);

    this.kutuphaneService.unitList().subscribe(result => {
      if (this.ch.checkResult(result)) {
        this.unitList = this.ch.addUnselectedItem(result.data, FirstItemTextType.pleaseSelect);
      }
    });


  }

  createUserForm() {
    this.userForm = this.ch.formBuilder.group({
      id: [0],
      identityNo: [],
      name: [],
      surname: [],
      email: [],
      phoneNo: [],
      unitOfWorkId: [],
      userType: []
    });
  }

  onChangeUnitOfWork(event: any) {
    this.userForm.controls['unitOfWorkId'].setValue(event.value);
  }

  saveUser() {
    // adminden eklenen kullanıcıların KPS servisine girmesine gerek yok
    const data = this.userForm.getRawValue();

    this.accountService.userAddOrUpdate(data).subscribe(result => {
      if (this.ch.checkResult(result)) {
        this.ch.messageHelper.showSuccessMessage(result.message);
      }
    });
  }

}
