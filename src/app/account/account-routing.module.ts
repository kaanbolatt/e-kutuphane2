import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { KullaniciProfiliComponent } from './components/kullanici-profili/kullanici-profili.component';
import { AppLoginComponent } from './components/login/app.login.component';
import { AydinlatmaComponent } from './components/aydinlatma/aydinlatma.component';

const routes: Routes = [
    { path: 'giris', component: AppLoginComponent },
    { path: 'aydinlatma', component: AydinlatmaComponent },
    { path: 'parola-yenile', component: ForgotPasswordComponent },
    { path: 'kullanici-profili', component: KullaniciProfiliComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
