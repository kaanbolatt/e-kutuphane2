import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { PublicationListRequest } from 'src/app/shared/interfaces/publication-list-request';
import { KutuphaneService } from 'src/app/sozlesme/services/kutuphane.service';

@Component({
  selector: 'app-list-yayin',
  templateUrl: './list-yayin.component.html',
  styleUrls: ['./list-yayin.component.scss']
})
export class ListYayinComponent extends BaseComponent implements OnInit {
  selected = 0
  publications = [];
  totalCount: number = 0;
  selectedPublicationId: any;
  selectedPublication: any;

  constructor(
    public service: KutuphaneService,
    private confirmationService: ConfirmationService,
    public router: Router
  ) { super() }

  ngOnInit(): void {
    this.getPublicationList(0, 10);

  }

  setSelectedRow(publication: any) {
    this.selectedPublication = publication;
    this.selectedPublicationId = publication.id;
  }

  paginate(event) {
    this.getPublicationList(event.page, event.rows);
  }

  getPublicationList(page: number, rows: number) {
    const model: PublicationListRequest = {
      page: page,
      rows: rows,
    };
    this.service.publicationList(model).subscribe(response => {
      if (this.ch.checkResult(response)) {
        this.publications = response.data;
        this.totalCount = Number.parseInt(response.message);
      }
    });
  }

  deletePublication() {

    this.confirmationService.confirm({
      message: 'Bu yayını silmek istediğinizden emin misiniz?',
      header: 'Yayın Sil',
      icon: 'pi pi-info-circle',
      acceptLabel: "Sil",
      rejectLabel: "Vazgeç",
      rejectButtonStyleClass: "p-button-danger",
      accept: () => {
        this.service.deletePublication(this.selectedPublicationId).subscribe((res) => {
          if (this.ch.checkResult(res)) {
            this.ch.messageHelper.showSuccessMessage(res.message);
            this.getPublicationList(0, 10);
          }
        });
      }
    });
  }

  editPublication() {
    this.router.navigate(['/panel'], { queryParams: { publicationId: this.selectedPublicationId, yayinTuru: this.selectedPublication.yayinTurleri } });
  }

  selectedPublicationType(val) {
    this.selected = val;
  }

}
