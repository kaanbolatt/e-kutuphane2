import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, Message, PrimeIcons } from 'primeng/api';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { ColumnType } from 'src/app/shared/enums/column-type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserListComponent extends BaseComponent implements OnInit {
  userFilterForm: FormGroup;
  items: MenuItem[] = []
  msgs: Message[] = [];
  active: any[] = [];
  displayInfo = false;
  displayContract = false;
  display = false;
  displayVpn = false;
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
      { label: "VPN Formu Ekle", icon: PrimeIcons.REFRESH, command: () => { this.addVpnForm() } },
      { label: "Sözleşme Ekle", icon: PrimeIcons.UNDO, command: () => { this.changeRole() } },
      { label: "Detay", icon: PrimeIcons.TRASH, command: () => { this.updateRole() } },

    ]
    this.gh.clearComponent();
    this.createUserForm();
    this.gh.createColumns(this.userGridColumns);
  }
addVpnForm(){

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
    this.displayContract = true;

  }

  roleChange(event)
  {    
    this.roleId = { "roleId": event.value }
  }

  updateRole() {
    this.displayInfo = true;
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

  displayInfoFalser() {
    this.displayInfo = false;
    this.selectedRow=null;
    this.gridRefresh();
  }
  
  displayContractFalser() {
    this.displayContract = false;
    this.selectedRow=null;
    this.gridRefresh();
  }
  displayVpnFalser() {
    this.displayVpn = false;
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
