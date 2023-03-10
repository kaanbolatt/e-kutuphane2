import { NgModule } from '@angular/core';
import { SozlesmeRoutingModule } from './sozlesme-routing.module';
import { ShareddModule } from '../shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { BooksComponent } from './components/books/books.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [

  
    BooksComponent
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
