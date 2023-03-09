import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccountService } from '../account/services/account.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ToggleButtonModule,
        OverlayPanelModule,
        RadioButtonModule,
        ScrollPanelModule
    ],
    declarations: [
    ],
    providers: [
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToggleButtonModule,
        OverlayPanelModule,
        RadioButtonModule,
        ScrollPanelModule
    ]
})
export class CoreModule { }
