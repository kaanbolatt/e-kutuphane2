import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/bases/base.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sayfa-basligi',
  templateUrl: './sayfa-basligi.component.html',
  styleUrls: ['./sayfa-basligi.component.css'],
})

export class SayfaBasligiComponent extends BaseComponent implements OnInit {
  @Input() baslik: string;
  items: MenuItem[];
  icon: MenuItem;

  constructor() {
    super();
  }

  ngOnInit() {
    this.items = [{ label: this.baslik }];
    this.icon = { icon: 'fa fa-angle-double-right' };
  }
}
