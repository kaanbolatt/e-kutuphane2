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



@NgModule({
  declarations: [
    ListYayinComponent,
    AddYayinComponent,
    AddBookComponent,
    AddMagazineComponent,
    AddArticleComponent,
    PanelLayoutComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ShareddModule
  ]
})
export class PanelModule { }
