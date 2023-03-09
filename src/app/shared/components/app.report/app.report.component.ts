import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-report',
  templateUrl: './app.report.component.html',
  styleUrls: ['./app.report.component.css']
})

export class ReportComponent extends BaseComponent implements OnInit {

  @ViewChild('reportContent', { static: true }) reportContent: ElementRef;
  @Input() raporBasligi = '';
  @Input() displayExcel = true;
  @Input() displayPdf = true;
  @Input() displayYazdir = true;
  @Input() displayYeniSekme = true;
  @Input() border = true;
  @Input() vertical = false;
  @Input() displayCustomToolbar = false;
  reportHtml: string;
  constructor() {
    super();
  }

  ngOnInit() {

  }
  
  downloadPdf() {
    window.scroll(0, 0);
    const element = document.getElementById('content');
    html2pdf(element, {
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        logging: true,
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    });
  }

  downloadExcel() {
    let content = this.reportContent.nativeElement;
    console.log(content.innerHTML);
    let style = '';
    if (this.border === true) {
      style = '<style>table,td,th {border: 1px solid black;border-collapse: collapse;}</style>';
    }

    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>' + style + '</head><body><table>{table}</table></body></html>';
    const base64 = (s) => window.btoa(decodeURI(encodeURIComponent(s)));
    const format = (s, c) => s.replace(/{(\w+)}/g, (_m, p) => c[p]);

    if (!content.nodeType) {
      content = document.getElementById(content);
    }
    const ctx = { worksheet: '' || 'Sayfa1', table: content.innerHTML };
    window.location.href = uri + base64(format(template, ctx));
  }

  yeniSekmedeAc() {
    const newWindow = window.open();
    newWindow.document.write(this.reportContent.nativeElement.innerHTML);
  }

  print(): void {
    let orientationCss = '';
    if (this.vertical) {
      orientationCss = '<link href="../../../../assets/css/print-window-landscape.css" rel="stylesheet" type="text/css"/>';
    } else {
      orientationCss = '<link href="../../../../assets/css/print-window-letter.css" rel="stylesheet" type="text/css"/>';
    }
    const printContents = this.reportContent.nativeElement.innerHTML;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          ${orientationCss}
          <style></style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
