import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListYayinComponent } from './list-yayin/list-yayin.component';
import { AddYayinComponent } from './add-yayin/add-yayin.component';
import { AddBookComponent } from './add-yayin/add-book/add-book.component';
import { AddMagazineComponent } from './add-yayin/add-magazine/add-magazine.component';
import { AddArticleComponent } from './add-yayin/add-article/add-article.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ShareddModule } from '../shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { AddBirimComponent } from './add-birim/add-birim.component';
import { BannerListesiComponent } from './banner-listesi/banner-listesi.component';
import { IletisimListesiComponent } from './iletisim-listesi/iletisim-listesi.component';



@NgModule({
  declarations: [
    ListYayinComponent,
    AddYayinComponent,
    AddBookComponent,
    AddMagazineComponent,
    AddArticleComponent,
    PanelLayoutComponent,
    AddUserComponent,
    AddBirimComponent,
    IletisimListesiComponent,
    BannerListesiComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ShareddModule
  ]
})
export class PanelModule { }
