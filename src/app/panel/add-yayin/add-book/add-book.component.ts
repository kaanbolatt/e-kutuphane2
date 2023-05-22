import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { FirstItemTextType } from 'src/app/shared/enums/first-item-text-type.enum';
import { LanguageEnum, languageEnumDescriptions } from 'src/app/shared/enums/language-type.enum';
import { PublicationTypeEnum } from 'src/app/shared/enums/publication-type.enum';
import { CustomBlob } from 'src/app/shared/helpers/common-helper';
import { KutuphaneService } from 'src/app/sozlesme/services/kutuphane.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent extends BaseComponent implements OnInit {

  fileUploadClear = false;
  dosyaNameKapak = 'dosya';
  dosyaNameIcerik = 'dosya2';
  publicationForm: FormGroup;
  languageType = [];
  publicationTypeEnum: typeof PublicationTypeEnum = PublicationTypeEnum;
  imageAndFileBlobs: CustomBlob[] = [];
  isItNew = true;
  articleAddFormVisible = false;
  articleForm: FormGroup;
  articleTypeList = [];
  headerTitle = "Yayın Ekle";
  buttonTitle = "Yayın Ekle";

  constructor(
    private kutuphaneService: KutuphaneService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    super()
  }

  ngOnInit(): void {
    this.createPublicationForm();
    this.startedData();
    if (Number(this.route.queryParams['_value'].publicationId)) {
      this.kutuphaneService.getPublicationById(Number(this.route.queryParams['_value'].publicationId)).subscribe((res) => {
        this.ch.mapToFormGroup(res.data, this.publicationForm);
        this.headerTitle = res.data.baslik + " (" + res.data.language + ")";
        this.isItNew = false;
        this.buttonTitle = "Yayını Güncelle"
      })
    }
  }
  startedData() {
    const languageTypeList = this.ch.enumToSelectItemArray(LanguageEnum, languageEnumDescriptions, []);
    this.languageType = this.ch.addUnselectedItem(languageTypeList, FirstItemTextType.pleaseSelect);
  }

  createPublicationForm() {
    this.publicationForm = this.ch.formBuilder.group({
      id: [0],
      baslik: ['', Validators.required],
      sayfaSayisi: ['', Validators.required],
      language: ['', Validators.required],
      basimTarihi: ['', Validators.required],
      authorTagChips: ['', Validators.required],
      aciklama: ['', Validators.required],
      keyWordTagChips: ['', Validators.required],
      yayinTurleri: [PublicationTypeEnum.Makale],
    });
  }

  get baslik() { return this.publicationForm.get('baslik'); }
  get sayfaSayisi() { return this.publicationForm.get('sayfaSayisi'); }
  get language() { return this.publicationForm.get('language'); }
  get basimTarihi() { return this.publicationForm.get('basimTarihi'); }
  get authorTagChips() { return this.publicationForm.get('authorTagChips'); }
  get aciklama() { return this.publicationForm.get('aciklama'); }
  get keyWordTagChips() { return this.publicationForm.get('keyWordTagChips'); }

  savePublication() {
    const data = this.publicationForm.getRawValue();

    const kapakResmi = this.ch.globals.fileUploadFormData.getAll(this.dosyaNameKapak);
    kapakResmi.forEach((file) => {
      const fileEntryAsBlob = file as Blob;
      const blob = new CustomBlob(fileEntryAsBlob, 'kapak');  // kapak resminin FileName = 'kapak'
      this.imageAndFileBlobs.push(blob);
    });

    const icerikDosya = this.ch.globals.fileUploadFormData.getAll(this.dosyaNameIcerik);
    icerikDosya.forEach((file) => {
      const fileEntryAsBlob = file as Blob;
      const blob = new CustomBlob(fileEntryAsBlob, 'icerik'); // yayınlanacak dosyanın FileName = 'icerik'
      this.imageAndFileBlobs.push(blob);
    });

    const formData = this.ch.createFormDataWithBlobs(this.imageAndFileBlobs, data);
    this.kutuphaneService.addPublication(formData).subscribe(result => {
      if (this.ch.checkResult(result)) {
        this.ch.messageHelper.showSuccessMessage(result.message);
        this.returnYayinListesi();
      }
    });
  }


  returnYayinListesi() {
    this.router.navigate(['/admin/yayin-listesi'])
  }
}
