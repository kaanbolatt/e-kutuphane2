import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { ColumnType } from 'src/app/shared/enums/column-type';
import { IslemTipi } from 'src/app/shared/enums/islem-tipi.enum';
import { KutuphaneService } from 'src/app/sozlesme/services/kutuphane.service';

@Component({
  selector: 'app-banner-listesi',
  templateUrl: './banner-listesi.component.html',
  styleUrls: ['./banner-listesi.component.scss']
})
export class BannerListesiComponent extends BaseComponent implements OnInit {
  islemMenuItems: MenuItem[];
  isDialogDetayVisible = false;
  selectedRowData: any;
  dialogDetayHeader = '';
  dialogFormHeader = '';
  dialogDetayContent = '';
  dialogForm: FormGroup;
  isDialogFormVisible: boolean;
  islemTipiEnum: typeof IslemTipi = IslemTipi;
  islemTipi: IslemTipi;

  bannerGridColumns = [
    ['aciklama', 'Açıklama', ColumnType.text],
    ['order', 'Sıra', ColumnType.template],
    ['islemler', 'İşlemler', ColumnType.template]
  ];


  constructor(private kutuphaneService: KutuphaneService) { super() }

  ngOnInit(): void {
    this.gh.clearComponent();
    this.createFilterForm();
    this.createDialogForm();
    this.gh.createColumns(this.bannerGridColumns);
    this.getMenuItems();
  }

  
  createFilterForm() {
    this.gh.setFilterForm(
      this.ch.formBuilder.group({
        order: [''],
      }));
  }

  createDialogForm() {
    this.dialogForm = this.ch.formBuilder.group({
      id: [0],
      aciklama: ['', Validators.required],
      order: ['', Validators.required]
    });
  }

  get aciklama() { return this.dialogForm.get('aciklama'); }
  get order() { return this.dialogForm.get('order'); }



  openDialog(islemTipi: IslemTipi, id = 0) {
    this.islemTipi = islemTipi;
    this.isDialogFormVisible = true;
    this.getDbItemToForm(id);
    this.setHeader();
  }

  setHeader() {
    this.dialogFormHeader = this.islemTipi === IslemTipi.yeniKayit ? 'Yeni Banner Ekle' : 'Bannerı Güncelle';
  }


  getDbItemToForm(id: number) {
    this.dialogForm.reset();
    if (this.dialogForm.valid !== true && this.islemTipi === IslemTipi.guncelleme) {
      this.ch.validateAllFormFields(this.dialogForm);
    }
    if (this.islemTipi == IslemTipi.yeniKayit) {
      this.dialogForm.patchValue({ id: 0 });
    } else {
      this.kutuphaneService.getBannerById(id).subscribe(result => {
        if (this.ch.checkResult(result)) {
          this.ch.mapToFormGroup(result.data, this.dialogForm);
        }
      });
    }
  }

  saveBanner() {
    const data = this.dialogForm.getRawValue();
    this.kutuphaneService.saveBanner(data).subscribe(result => {
      if (this.ch.checkResult(result)) {
        this.dialogForm.reset();
        this.bannerTextGridRefresh();
        this.ch.messageHelper.showSuccessMessage(result.message);
        this.isDialogFormVisible = false;
      }
    });
  }

  clearFilters() {
    this.gh.clearFilters();
    this.bannerTextGridRefresh();
  }

  bannerTextGridRefresh() {
    this.gh.beforeGridRefresh();
    this.gh.beforeGridRefresh();
    this.kutuphaneService.bannerTextList().subscribe((result) => {
      this.gh.createColumns(this.bannerGridColumns);
      this.gh.gridDatabind(result);
    });
  }

  setSelectedRow(rowData: any) {
    this.selectedRowData = rowData;

  }

  getMenuItems(): void {
    this.islemMenuItems = [];
    this.islemMenuItems.unshift({
      label: 'Sil', icon: 'pi pi-trash', command: () => {
        this.deleteRowDataById();
      }
    });
    this.islemMenuItems.unshift(
      {
        label: 'Detay', icon: 'pi pi-eye', command: () => {
          this.openDialog(IslemTipi.guncelleme, this.selectedRowData.id);
        }
      }
    );

  }

  closeDialog(isGridRefresh: boolean) {
    this.isDialogFormVisible = false;
    if (isGridRefresh) {
      this.bannerTextGridRefresh();
    }
  }

  deleteRowDataById() {
    // this.confirmationService.confirm({
    //   message: 'Bu banner ı silmek istediğinizden emin misiniz?',
    //   header: 'Banner Sil',
    //   icon: 'pi pi-info-circle',
    //   acceptLabel: "Sil",
    //   rejectButtonStyleClass: "p-button-danger",
    //   accept: () => {
    this.kutuphaneService.deleteBannerTextById(this.selectedRowData.id).subscribe(result => {
      if (this.ch.checkResult(result)) {
        this.bannerTextGridRefresh();
        this.ch.messageHelper.showSuccessMessage(result.message);
      }
    });
  }

}
