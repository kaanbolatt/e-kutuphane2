import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'hesap', data: { title: 'Hesap İşemleri' }, children:
                    [
                        { path: '', loadChildren: () => import('../../src/app/account/account.module').then(m => m.AccountModule) },
                    ]
            },
            {
                path: '', component: AppMainComponent, data: { title: 'Çağrı Merkezi' }, children:
                    [
                        { path: '', loadChildren: () => import('./sozlesme/sozlesme.module').then(m => m.SozlesmeModule) },
                    ]
            },
            {
                path: 'main', data: { title: 'Çağrı Merkezi' }, children:
                    [
                        { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
                    ]
            },
            {
                path: 'panel', data: { title: 'Çağrı Merkezi' }, children:
                    [
                        { path: '', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule) },
                    ]
            },

            { path: '**', redirectTo: '/' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
