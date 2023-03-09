import { NgModule } from '@angular/core';
import { SozlesmeRoutingModule } from './sozlesme-routing.module';
import { ShareddModule } from '../shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import { KullaniciListesiComponent } from './components/kullanici-listesi/kullanici-listesi.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { NewPeronelAddOrrUpdateComponent } from './components/new-peronel-add-orr-update/new-peronel-add-orr-update.component';
import { FirmaIslemleriListComponent } from './components/firma-islemleri-list/firma-islemleri-list.component';
import { FirmaIslemleriAddOrUpdateComponent } from './components/firma-islemleri-add-or-update/firma-islemleri-add-or-update.component';
import { PersonelInfoComponent } from './components/personel-info/personel-info.component';
import { AddContractComponent } from './components/add-contract/add-contract.component';
import { VpnHistoryComponent } from './components/vpn-history/vpn-history.component';
import { VpnListComponent } from './components/vpn-list/vpn-list.component';
import { AddVpnComponent } from './components/add-vpn/add-vpn.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    UserListComponent,
    NewPeronelAddOrrUpdateComponent,
    FirmaIslemleriListComponent,
    FirmaIslemleriAddOrUpdateComponent,
    PersonelInfoComponent,
    AddContractComponent,
    VpnHistoryComponent,
    VpnListComponent,
    AddVpnComponent,
  ],
  imports: [
    SozlesmeRoutingModule,
    ShareddModule,
    CommonModule,
    FullCalendarModule,
    CardModule,
    VirtualScrollerModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    

  ]
})
export class SozlesmeModule { }
