import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  
  

  

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]

})
export class PanelRoutingModule { }
