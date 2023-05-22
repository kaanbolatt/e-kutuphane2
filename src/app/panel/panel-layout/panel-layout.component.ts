import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})
export class PanelLayoutComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  gotoKullaniciEkle() {
    this.router.navigate(['/panel/kullanici-ekle']);
  }
  gotoBirimEkle() {
    this.router.navigate(['/panel/birim-ekle']);
  }
  publicationAdd() {
    this.router.navigate(['/panel']);
  }
  gotoIletisimListesi() {
    this.router.navigate(['/panel/iletisim-listesi']);
  }
  gotoBannerListesi() {
    this.router.navigate(['/panel/banner-listesi']);
  }
  gotoYayinListesi() {
    this.router.navigate(['/panel/yayin-listesi']);
  }
  gotoAnasayfa() {
    this.router.navigate(['S']);
  }
}
