import { Directive } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'p-fileUpload'
})

export class FileUploadDirective {
  constructor(fileUpload: FileUpload) {
    fileUpload.uploadLabel = 'Yükle';
    fileUpload.cancelLabel = 'İptal';
    fileUpload.showUploadButton = false;
    fileUpload.showCancelButton = false;
    fileUpload.maxFileSize = 50000000;
  }
}
