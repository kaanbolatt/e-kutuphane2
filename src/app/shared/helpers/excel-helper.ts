import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ColumnType } from '../enums/column-type';
import { BaseComponent } from '../../shared/bases/base.component';
import { DateHelper } from './date-helper';
@Injectable({
    providedIn: 'root'
})
// Excelle İlgili Metodlarımızı Buraya Yazabiliriz.
export class ExcelHelper extends BaseComponent {
    constructor(
        private datePipe: DatePipe,
        public dateHelper: DateHelper
    ) {
        super();
    }

    // Sadece Excelin Kolonlarını Çıktı Olarak Çıkarır.
    exportExcelFromJson(jsonData, columnMapping: any = null, dosyaAdi: string = ''): void {
        const fileName = this.getFileName(jsonData, columnMapping, dosyaAdi);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData, { dateNF: 'dd.MM.yyyy' });
        this.createExcelFile(ws, fileName);
    }

    // Excele Başlık Ekler ve Kolonlarını Çıkarır.
    exportExcelFromJsonWithTitle(jsonData, columnMapping: any = null, dosyaAdi: string = '', title: string = ''): void {
        const fileName = this.getFileName(jsonData, columnMapping, dosyaAdi);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{}], { dateNF: 'dd.MM.yyyy' });
        XLSX.utils.sheet_add_json(ws, [{}], { header: [title + ' - ' + this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss')], origin: 'A1' });
        XLSX.utils.sheet_add_json(ws, jsonData, { origin: 'A2' });
        this.createExcelFile(ws, fileName);
    }

    // Excele Başlık Ekler ve İkinci Satırda İstediği Kolonları Parametre Alır, Diğerlerini Dördüncü Satırda Gösterir.
    // ! Daha Sonra Dinamik Hale Getirilecektir.
    exportExcelFromJsonWithTitleAndFirstColumn(jsonData, columnMapping: any = null, dosyaAdi: string = '', title: string = '', firstList: string[] = []): void {
        const fileName = this.getFileName(jsonData, columnMapping, dosyaAdi);
        const jsonData1 = Object.assign({}, jsonData[0]);
        const jsonData2 = Object.assign({}, jsonData[0]);
        for (let index = 0 as number; index < firstList.length; index++) {
            delete jsonData2[firstList[index]];
        }
        for (let index = 0 as number; index < Object.keys(jsonData2).length; index++) {
            delete jsonData1[Object.keys(jsonData2)[index]];
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{}], { dateNF: 'dd.MM.yyyy' });
        XLSX.utils.sheet_add_json(ws, [{}], { header: [title + ' - ' + this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm:ss')], origin: 'A1' });
        XLSX.utils.sheet_add_json(ws, [jsonData1], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, [jsonData2], { origin: 'A4' });
        this.createExcelFile(ws, fileName);
    }

    // Excel İsmini Belirler.
    getFileName(jsonData, columnMapping: any = null, dosyaAdi: string = '') {
        let fileName = '';
        if (!this.ch.isNullOrUndefined(columnMapping)) {
            for (const mapping of columnMapping) {
                if (!this.ch.isNullOrUndefined(mapping[2])) {
                    for (const obj of jsonData) {
                        if (mapping[2] === ColumnType.date) {
                            obj[mapping[0]] = !this.ch.isNullOrUndefined(obj[mapping[0]]) ? this.dateHelper.convertFormattedDate(obj[mapping[0]]) : '';
                        } else if (mapping[2] === ColumnType.dateTime) {
                            obj[mapping[0]] = !this.ch.isNullOrUndefined(obj[mapping[0]]) ? this.dateHelper.convertFormattedDatetime(obj[mapping[0]]) : '';
                        }
                    }
                }
            }
            this.ch.convertArrayProperty(jsonData, columnMapping);
        }
        if (!this.ch.isNullOrWhiteSpace(dosyaAdi)) {
            fileName = dosyaAdi + '.xlsx';
        } else {
            fileName = this.ch.createGuid() + '.xlsx';
        }
        return fileName;
    }

    // Exceli Oluşturur.
    createExcelFile(ws: any, fileName: string = '') {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sayfa1');
        XLSX.writeFile(wb, fileName);
    }
}
