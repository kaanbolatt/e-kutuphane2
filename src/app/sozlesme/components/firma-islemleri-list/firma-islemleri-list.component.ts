import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem, Message, ConfirmationService, PrimeIcons } from 'primeng/api';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { ColumnType } from 'src/app/shared/enums/column-type';

@Component({
  selector: 'app-firma-islemleri-list',
  templateUrl: './firma-islemleri-list.component.html',
  styleUrls: ['./firma-islemleri-list.component.scss']
})
export class FirmaIslemleriListComponent extends BaseComponent implements OnInit {

  userFilterForm: FormGroup;
  items: MenuItem[] = []
  msgs: Message[] = [];
  active: any[] = [];
  
  display: boolean = false;
  createdDateFirst=false;
  updateDateFirst=false;
  cityId = {}
  roleId = {}


  selectedRow: any;


  userGridColumns = [
    ['name', 'İsim', ColumnType.text],
    ['surname', 'Soyadı', ColumnType.text],
    ['email', 'E-posta', ColumnType.text],
    ['identityNo', 'T.C.', ColumnType.text],
    ['roleName', 'Rol Adı', ColumnType.text],
    ['cityName', 'İl ', ColumnType.template,true],
    ['districtName', 'İlçe ', ColumnType.template,true],
    ['institutionName', 'Kurum ', ColumnType.text],
    ['isActive', 'Aktiflik Durumu', ColumnType.template,true],
    ['islemler', 'İşlemler', ColumnType.template],
  ];
  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService
  ) { super() }



  ngOnInit(): void {
    this.active = [{ label: "Aktif", value: "true" }, { label: "Pasif", value: "false" }]

    this.items = [
      { label: "Sil", icon: PrimeIcons.TRASH, command: () => { this.deleteUser() } },
      { label: "Güncelle", icon: PrimeIcons.REFRESH, command: () => { this.updateRole() } },
      { label: "Durum Değiştir", icon: PrimeIcons.UNDO, command: () => { this.changeRole() } }
    ]
    this.gh.clearComponent();
    this.createUserForm();
    this.gh.createColumns(this.userGridColumns);
  }

  rowSelect(rowData: any) {
    this.selectedRow = rowData
   
while( rowData.mobilePhone.charAt(0) === '0')
{
 rowData.mobilePhone = rowData.mobilePhone.substring(1);
}
    console.log(rowData)
  }

  changeRole() {
    this.accountService.changeUserState(this.selectedRow.id).subscribe(result => {
      this.gridRefresh();
    })
  }

  roleChange(event)
  {    
    this.roleId = { "roleId": event.value }
  }

  updateRole() {
    this.display = true;
  }

  clearFilter() {
    this.gh.getFilterForm().reset();
    this.gridRefresh();
  }
  createUserForm() {
    this.gh.setFilterForm(
      this.ch.formBuilder.group({
        name: [''],
        surname: [''],
        email: [''],
        mobilePhone: [''],
        identityNo: [''],
        cityCode: '',
        districtCode: [''],
        institutionCode: [''],
        roleId: [''],
        isActive: [''],
        createdDate: [''],
        createdDateEnd: [''],
        createdDateStart: [''],
        updatedDate: [''],
        updatedDateStart: [''] ,
        updatedDateEnd: ['']

      }), 0);
  }

  async gridRefresh() {
    this.gh.beforeGridRefresh();
    await this.accountService.userListForGrid().subscribe(result => {
      this.gh.gridDatabind(result);
    });
    return;
  }
calendarCreatedChange(event){
if(this.createdDateFirst==false){
this.gh.getFilterForm().controls['createdDateStart'].setValue(event);
this.createdDateFirst=true;
}else{
  this.gh.getFilterForm().controls['createdDateEnd'].setValue(event);
  this.createdDateFirst=false;
}

}

clearCreated(){
  this.createdDateFirst=false;
}
calendarUpdateChange(event){
  if(this.updateDateFirst==false){
  this.gh.getFilterForm().controls['updatedDateStart'].setValue(event);
  this.createdDateFirst=true;
  }else{
    this.gh.getFilterForm().controls['updatedDateEnd'].setValue(event);
    this.updateDateFirst=false;
  }
  
  }
  
  clearUpdate(){
    this.updateDateFirst=false;
  }
  

  cityChange(event: any) {
    this.cityId = { "cityCode": event.value }
    this.gh.getFilterForm().controls['districtCode'].setValue("")
  }
  districtChange(event: any) {
    this.cityId = { "districtCode": event.value }
    this.gh.getFilterForm().controls['institutionCode'].setValue("")
  }
  displayFalser() {
    this.display = false;
    this.selectedRow=null;
    this.gridRefresh();
  }

  deleteUser() {
    this.confirmationService.confirm({
      message: 'Bu kullanıcıyı silmek istediğinizden emin misiniz?',
      header: 'Kullanıcı Silme',
      icon: 'pi pi-info-circle',
      acceptLabel: "Sil",
      rejectLabel: "Vazgeç",
      rejectButtonStyleClass: "p-button-danger",
      accept: () => {
        this.accountService.deleteUser(this.selectedRow.id).subscribe(result => {
          if (this.ch.checkResultLight(result)) {
            this.gridRefresh()
          }
        });
      }
    });
  }
}
