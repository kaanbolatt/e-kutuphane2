import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { FirmaIslemleriListComponent } from './components/firma-islemleri-list/firma-islemleri-list.component';
import { VpnListComponent } from './components/vpn-list/vpn-list.component';

const routes: Routes = [
    //USER AREA
    //ADMİN AREA

    { path: 'kullanici-listesi', component: UserListComponent },
    { path: 'firma-listesi', component: FirmaIslemleriListComponent },
    { path: 'vpn-listesi', component: VpnListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SozlesmeRoutingModule { }
