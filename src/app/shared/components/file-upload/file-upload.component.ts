import { AfterViewChecked, TemplateRef, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation, Output, EventEmitter, ViewChild, ContentChild, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonService } from '../../../core/services/common.service';
import { BaseComponent } from '../../bases/base.component';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FileUploadComponent extends BaseComponent implements OnInit, AfterViewChecked, OnChanges {
  @ContentChild('fileUploadCustomTemplate') templateChild: TemplateRef<any>;

  @ViewChild('fileUpload') fileUpload: any;
  @Input() butonGorunum = true;
  @Input() id: string;
  @Input() isMultiple = true;
  @Input() disabled = false;
  @Output() removedCallback = new EventEmitter();
  @Output() selectCallback = new EventEmitter();
  @Input() accept = this.ch.globals.fileUploadAcceptAllExtension;
  @Input() showAccept = this.ch.globals.fileUploadShowAcceptAllExtensions;
  @Input() maxFileSize = this.ch.globals.fileUploadMaxDataSize; // 5 mb 
  @Input() files: any = [];
  @Input() isHidden = true;
  @Input() dosyaSilBtn = true;
  @Input() fileUploadTemizle = false;
  fileName:string="Yüklemek istediğiniz dosyayı seçin."

  activeImageUrl: SafeUrl;
  lastImageUrl = '';
  isHiddenFileSize = 0;
  isCheck = true;
  uploadedfiles: any = [];

  constructor(
    public cs: CommonService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {
    super();
  }
  fileAdded(str){
this.fileName="Yüklenen Dosya :"+str
  }
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.fileUploadTemizle) {
      console.log(this.fileUpload)
      this.fileUpload._files=[]
      this.fileUpload.clear();
      this.globals.fileUploadFormData.delete(this.id);
    }

   
  }

  ngOnInit() {
    this.activeImageUrl = this.sanitizer.bypassSecurityTrustUrl('');
    console.log(this.fileUpload)

  }

  // Elementlerin görünmemesi ve ekran alanından kazanılması için yapıldı
  ngAfterViewChecked() {
    const elBtnBar = this.elRef.nativeElement.querySelector('.p-fileupload-buttonbar');
    if (elBtnBar !== null) {
      if (this.disabled) {
        this.renderer.setStyle(elBtnBar, 'display', 'none');
      } else {
        this.renderer.setStyle(elBtnBar, 'display', 'inherit');
      }
    }
  }

  onSelect(event) {
  
    this.uploadedfiles=event.currentFiles;
    console.log(this.uploadedfiles)
    for (const file of event.files) {
      this.ch.globals.fileUploadFormData.append(this.id, file);
      this.selectCallback.emit({ id: this.id, file });
    }
    this.isHiddenFileSize++;
    if (this.isHiddenFileSize > 0) {
      this.isHidden = false;
    } else {
      this.isHidden = true;
    }
 
  }
clear(){

}
  onRemove(event) {
    this.dosyaSil(event.file);
  }

  dosyaSil(silinecekDosya) {
    
   
    const silinmedenOncekiDosyalar = this.ch.globals.fileUploadFormData.getAll(this.id);
    const silinmedenOncekiDosyaListesi = silinmedenOncekiDosyalar.splice(0, silinmedenOncekiDosyalar.length);

    
    const index = this.fileUpload._files.findIndex(object => {
      return object.size === silinecekDosya.size;
    });
   this.fileUpload._files.splice(index,1);
     console.log(this.fileUpload)


   


    this.ch.globals.fileUploadFormData.delete(this.id);

    for (const file of silinmedenOncekiDosyaListesi) {
      if (file['name'] !== silinecekDosya['name']) {
        this.ch.globals.fileUploadFormData.append(this.id, file);
      }
    }


    silinecekDosya.id = this.id;
    this.removedCallback.emit(silinecekDosya);
  }
 

  openImage(fileName: string) {
    if (this.lastImageUrl !== fileName) {
      // this.cs.getSecureFileUrl(fileName).subscribe((result) => {
      //   this.lastImageUrl = fileName;
      //   this.activeImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result));
      //   this.isCheck = this.isCheck ? false : true;
      // });
    }
  }
}
