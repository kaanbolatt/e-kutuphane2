import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem, Message, PrimeIcons } from 'primeng/api';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { ColumnType } from 'src/app/shared/enums/column-type';

@Component({
  selector: 'app-vpn-history',
  templateUrl: './vpn-history.component.html',
  styleUrls: ['./vpn-history.component.scss']
})
export class VpnHistoryComponent extends BaseComponent implements OnInit {
  @Input() display:boolean = true;
  @Output() displayFalser=new EventEmitter()
  msgs: Message[] = [];
  active: any[] = [];
  tableColumn = [
    ['name', 'İşlem', ColumnType.text],
    ['surname', 'Kullanıcı', ColumnType.text],
    ['email', 'Açıklama', ColumnType.text],
    ['identityNo', 'Tarih.', ColumnType.text],
    ['roleName', 'Rol Adı', ColumnType.text],

  ];

  constructor(
    private accountService:AccountService
  ) { super()}

  ngOnInit(): void {
    this.active = [{ label: "Aktif", value: "true" }, { label: "Pasif", value: "false" }]

 
    this.gh.clearComponent(1);
    this.gh.createColumns(this.tableColumn,1);
  }
  displayFalse(){
    this.displayFalser.emit();
    this.display=false
      }
   gridRefresh() {
    this.gh.beforeGridRefresh(1);
     this.accountService.userListForGrid().subscribe(result => {
      this.gh.gridDatabind(result,1);
    });
  }
}
