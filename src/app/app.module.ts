import { LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
// PrimeNG Components for demos
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TooltipModule } from 'primeng/tooltip';
import { RECAPTCHA_V3_SITE_KEY } from "ng-recaptcha";
// Application Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMainComponent } from './app.main.component';

import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';


// Application services
import { BreadcrumbService } from './breadcrumb.service';
import { MenuService } from './app.menu.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppInterceptor } from './shared/interceptor/app.interceptor';
import { ShareddModule } from './shared/shared.module';
import { CommonService } from './core/services/common.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { NgControl } from '@angular/forms';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
]);

export function tokenGetter() {
    return localStorage.getItem('auth_token');
}

@NgModule({
    imports: [
        TooltipModule,
        BrowserModule,
        AppRoutingModule,
        ShareddModule,
        BrowserAnimationsModule,
        FileUploadModule,
        NgxUiLoaderModule,
        ConfirmDialogModule,
        ShareddModule,       
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            }
        }),
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
    ],
    providers: [
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.recaptcha.siteKey,
        },
        { provide: LOCALE_ID, useValue: 'tr-TR' },
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },

        MenuService, BreadcrumbService, CommonService, ReCaptchaV3Service, AuthGuard, RoleGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
