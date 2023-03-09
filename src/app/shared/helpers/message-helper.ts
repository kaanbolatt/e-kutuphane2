import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PromptComponent } from '../components/dialogs/prompt/prompt.component';
import { ResultType } from '../enums/result-type';


@Injectable({
  providedIn: 'root'
})

export class MessageHelper {

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }

  showSuccessMessage(message?: string) {
    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: message !== '' && message != null ? message : 'İşlem başarıyla tamamlandı.', life: 10000 });
  }

  showInfoMessage(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: message, life: 10000 });
  }

  showWarnMessage(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: message, life: 10000 });
  }

  showErrorMessage(message?: string) {
    this.messageService.add({ severity: 'error', summary: 'Hata', detail: message, life: 10000 });
  }

  showMessage(messageType: ResultType, message?: string) {
    if (messageType === ResultType.success) {
      this.showSuccessMessage(message);
    } else if (messageType === ResultType.error) {
      this.showErrorMessage(message);
    } else if (messageType === ResultType.warning) {
      this.showWarnMessage(message);
     } //else if (messageType === ResultType.Info) {
    //   this.showInfoMessage(message);
    // }
  }

  confirm(message: string, onayEvent: () => void, iptalEvent?: () => void, header?: string, displayIptal: boolean = true, acceptLabel?: string, rejectLabel?: string) {
    const confirmation: Confirmation = {
      message,
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      header: header === null ? 'İşlem Onayı' :header,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: (rejectLabel === undefined || rejectLabel === null) ? 'İptal' : rejectLabel,
      acceptLabel: (acceptLabel === undefined || acceptLabel == null) ? 'Evet' : acceptLabel,
      rejectVisible: displayIptal,
      accept: onayEvent,
      // eslint-disable-next-line arrow-body-style
      reject: iptalEvent ? iptalEvent : () => {
        return;
      }
    };

    this.confirmationService.confirm(confirmation);
  }

  prompt(header: string, onayEvent: (onay: any) => void, iptalEvent?: () => void, multiline: boolean = false, nullable: boolean = false, width: string = '50%') {
    const ref = this.dialogService.open(PromptComponent, {
      header,
      width,
      data: {
        messageHelper: this,
        nullable,
        multiline
      }
    });

    ref.onClose.subscribe((result: any) => {
      if (result === undefined || result === null) {
        if (!!iptalEvent) {
          return iptalEvent();
        }
        return null;
      }
      if (result.type === 'ok') {
        return onayEvent(result.value);
      } else {
        if (!!iptalEvent) {
          return iptalEvent();
        }
      }
    });
  }
}
