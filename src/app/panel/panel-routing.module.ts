import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddYayinComponent } from './add-yayin/add-yayin.component';
import { ListYayinComponent } from './list-yayin/list-yayin.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { AddBirimComponent } from './add-birim/add-birim.component';
import { IletisimListesiComponent } from './iletisim-listesi/iletisim-listesi.component';
import { BannerListesiComponent } from './banner-listesi/banner-listesi.component';



// import { LayoutComponent } from 'metronic';

const routes: Routes = [{
  path: '',
  component:PanelLayoutComponent,
  children: [ {
    path: '',
    component: AddYayinComponent
  },
  {
    path: 'yayin-listesi',
    component: ListYayinComponent
  },
  {
    path: 'kullanici-ekle',
    component: AddUserComponent
  },
  {
    path: 'birim-ekle',
    component: AddBirimComponent
  },
  {
    path: 'iletisim-listesi',
    component: IletisimListesiComponent
  },
  {
    path: 'banner-listesi',
    component: BannerListesiComponent
  },
  
  

  

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]

})
export class PanelRoutingModule { }
