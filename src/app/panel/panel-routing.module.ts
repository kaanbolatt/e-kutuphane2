import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddYayinComponent } from './add-yayin/add-yayin.component';
import { ListYayinComponent } from './list-yayin/list-yayin.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';



// import { LayoutComponent } from 'metronic';

const routes: Routes = [{
  path: '',
  component:PanelLayoutComponent,
  children: [ {
    path: '',
    component: AddYayinComponent
  },
  {
    path: 'liste',
    component: ListYayinComponent
  },
  {
    path: 'kullanici-ekle',
    component: AddUserComponent
  },
  
  

  

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]

})
export class PanelRoutingModule { }
