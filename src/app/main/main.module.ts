import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AppFooterComponent } from '../app.footer.component';
import { MainRoutingModule } from './main-routing.module';
import { ShareddModule } from '../shared/shared.module';
import { BookDetailComponent } from './book-detail/book-detail.component';



@NgModule({
  declarations: [
    MainPageComponent,
    MainLayoutComponent,
    BookDetailComponent,

    
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareddModule
    
  ]
})
export class MainModule { }
