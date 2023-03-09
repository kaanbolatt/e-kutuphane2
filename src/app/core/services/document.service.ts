
import { Injectable } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';
import { HttpHelper } from './http-helper.service';
import { CommonHelper } from '../../shared/helpers/common-helper';

@Injectable()
export class DocumentService {
    commonControllerName = 'Document';
    constructor(
        private httpHelper: HttpHelper,
        private ch: CommonHelper
    ) { }

    //#region File

    downloadFileFromFtp(ftpFileUrl: string) {
        window.open(ftpFileUrl, '_blank');
    }

    downloadFile(fileGuid: string, tableName: number) {
        const token = localStorage.getItem('auth_token');
        this.httpHelper.getBlob(this.commonControllerName, 'DownloadFile', this.ch.createParams({ fileGuid, tableName, token })).subscribe(result => {
            importedSaveAs(result, fileGuid.replace(/^.*[\\\/]/, ''));
        });
    }

    getSecureFileUrl(fileName: string) {
        return this.httpHelper.getBlob(this.commonControllerName, 'DownloadFile', this.ch.createParams({ fileName }));
    }

    //#endregion
}