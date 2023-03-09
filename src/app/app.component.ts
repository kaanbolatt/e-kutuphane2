import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { PrimeNGConfig } from 'primeng/api';
import { CommonHelper } from './shared/helpers/common-helper';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    horizontalMenu: boolean;

    darkMode = false;

    menuColorMode = 'light';

    menuColor = 'layout-menu-light';

    themeColor = 'blue';

    layoutColor = 'blue';
    loading = true

    ripple = true;
    loaderBool: boolean = false;
    inputStyle = 'outlined';
    loaderConfig: NgxUiLoaderConfig = {
        fgsColor: '#dc3545',
        overlayColor: 'rgba(40, 40, 40, 0.1)',
        fgsSize: 70,
        fgsType: 'rectangle-bounce-pulse-out-rapid',
        hasProgressBar: false,

    };
    constructor(
        private primengConfig: PrimeNGConfig,
        public ch: CommonHelper,
        private activatedRoute: ActivatedRoute,
        private router: Router) {

        this.router.events.subscribe((e: RouterEvent) => {
            this.navigationInterceptor(e);
        })
    }

    ngOnInit() {

        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation({
            "dayNames": ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
            "dayNamesShort": ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            "dayNamesMin": ["Pa", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
            "monthNames": ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            "monthNamesShort": ["Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Ekm", "Kas", "Ara"],
            "dateFormat": "mm/dd/yy",
            "today": "Bugün",
            "clear": "Temizle"
        })


    }
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.ch.showLoader()
        }
        if (event instanceof NavigationEnd) {
            this.ch.hideLoader()
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.ch.hideLoader()
        }
        if (event instanceof NavigationError) {
            this.ch.hideLoader()
        }
    }
    // Shows and hides the loading spinner during RouterEvent changes
}
