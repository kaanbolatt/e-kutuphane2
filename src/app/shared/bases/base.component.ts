import { Component } from '@angular/core';
import { UserInfo } from '../interfaces/user-info';
import { AppInjector } from './app-injector.service';
import { GlobalVariables } from '../constants/global-variables';
import { CommonHelper } from '../helpers/common-helper';
import { CommonService } from '../../core/services/common.service';
import { GridHelper } from '../helpers/grid-helper';
import { UserHelper } from '../helpers/user-helper';
import { AnimationHelper } from '../helpers/animation-helper';
import { Constants } from '../constants/constants';

@Component({
    template: '',
})
export class BaseComponent {
    currentUser: UserInfo;
    public uh: UserHelper;
    public ah: AnimationHelper;

    public ch: CommonHelper;
    public globals: GlobalVariables;
    public cs: CommonService;
    public gh : GridHelper;
    public constants: Constants;

    constructor() {
        const injector = AppInjector.getInjector();
        this.ah = injector.get(AnimationHelper);
        this.uh = injector.get(UserHelper);
        this.gh = injector.get(GridHelper);
        this.ch = injector.get(CommonHelper);
        this.cs = injector.get(CommonService);
        this.globals = injector.get(GlobalVariables);
        this.constants = injector.get(Constants);
        this.currentUser = this.uh.currentUser;
    }
}
