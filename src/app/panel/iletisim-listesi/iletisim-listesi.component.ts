import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { ColumnType } from 'src/app/shared/enums/column-type';
import { gridColorDescriptions } from 'src/app/shared/enums/grid-color';
import { IletisimDurumuEnum } from 'src/app/shared/enums/iletisim-durumu.enum';
import { KutuphaneService } from 'src/app/sozlesme/services/kutuphane.service';

@Component({
  selector: 'app-iletisim-listesi',
  templateUrl: './iletisim-listesi.component.html',
  styleUrls: ['./iletisim-listesi.component.scss']
})
export class IletisimListesiComponent extends BaseComponent implements OnInit {
  selectedRowData: any;
  islemMenuItems: MenuItem[];
  dialogDetayHeader = '';
  dialogDetayContent = '';
  isDialogDetayVisible = false;

  communicationGridColumns = [
    ['adSoyad', 'Ad-Soyad', ColumnType.text],
    ['email', 'Mail', ColumnType.text],
    ['mobilePhone', 'Telefon Numarası', ColumnType.template],
    ['aciklama', 'Açıklama', ColumnType.template],
    ['iletisimDurumu', 'İletişim Durumu', ColumnType.template],
    ['islemler', 'İşlemler', ColumnType.template]
  ];

  constructor(private kutuphaneService: KutuphaneService) { super() }

  ngOnInit(): void {
    this.gh.clearComponent();
    this.createFilterForm();
    this.gh.createColumns(this.communicationGridColumns);
  }

  createFilterForm() {
    this.gh.setFilterForm(
      this.ch.formBuilder.group({
        adSoyad: [''],
        mobilePhone: [''],
        iletisimDurumu: [''],
        email: ['']
      }));
  }


  clearFilters() {
    this.gh.clearFilters();
    this.communicationGridRefresh();
  }

  communicationGridRefresh() {
    this.gh.beforeGridRefresh();

    this.gh.beforeGridRefresh();
    this.kutuphaneService.communicationList().subscribe((result) => {
      this.gh.createColumns(this.communicationGridColumns);
      this.gh.gridDatabind(result);
    });
  }

  setSelectedRow(rowData: any) {
    this.selectedRowData = rowData;
    this.getMenuItems();
  }

  getMenuItems(): void {
    this.islemMenuItems = [];
    this.islemMenuItems.unshift(
      {
        label: 'Detayı gör', icon: 'pi pi-eye', command: () => {
          this.isDialogDetayVisible = true;
          this.dialogDetayHeader = "Açıklama"
        }
      }
    );
  }

  closeDialog(isGridRefresh: boolean) {

  }

  getColoring(rowData) {
    if (rowData['iletisimDurumu'] == IletisimDurumuEnum.yeni) {
      return gridColorDescriptions.Yellow;
    }
    else {
      return gridColorDescriptions.Green;
    }
  }

}
