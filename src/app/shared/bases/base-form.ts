import { BaseComponent } from './base.component';
import { Component } from '@angular/core';

@Component({
    template: ''
})
export class BaseFormComponent extends BaseComponent {
    dialog = false;
    header = '';
    dialogHeader = '';

    searchMode(): boolean {
        if (!this.searchConditionMode()) {
            return false;
        }
        this.searchBeforeMode();
        return true;
    }

    searchBeforeMode() {
        this.gh.beforeGridRefresh();
        this.gh.getDataTableInfo().displayGrid = false;
    }

    searchConditionMode(isTrue = true): boolean {
        return isTrue;
    }

    searchAfterMode(result) {
        this.gh.getDataTableInfo().displayGrid = true;
        this.gh.gridDatabind(result);
        setTimeout(() => {
            this.header = 'Belirtilen Kritere Uygun ' + this.gh.getDataTableInfo().totalRecords + ' Kayıt Bulundu.';
        }, 0);
    }
    
    setDialogHeader(header: string) {
        this.dialogHeader = header;
    }

    dialogMode(isOpen: boolean) {
        if (isOpen) {
            this.dialog = true;
        } else {
            this.dialog = false;
        }
    }
}
