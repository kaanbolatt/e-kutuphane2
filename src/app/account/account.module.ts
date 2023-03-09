import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ShareddModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { KullaniciProfiliComponent } from './components/kullanici-profili/kullanici-profili.component';
import { AppLoginComponent } from './components/login/app.login.component';
import { AccountService } from './services/account.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AydinlatmaComponent } from './components/aydinlatma/aydinlatma.component';

@NgModule({
    imports: [
        ShareddModule,
        AccountRoutingModule,
        CheckboxModule,
        FormsModule,
    ],
    declarations: [
        KullaniciProfiliComponent,
        AppLoginComponent,
        ForgotPasswordComponent,
        AydinlatmaComponent
    ],
    providers: [
        AccountService,
    ],
    exports: [
    ]
})
export class AccountModule { }
