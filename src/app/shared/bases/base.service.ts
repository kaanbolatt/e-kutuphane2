import { Injectable } from '@angular/core';
import { HttpHelper } from '../../core/services/http-helper.service';
import { CommonHelper } from '../../shared/helpers/common-helper';
import { AppInjector } from './app-injector.service';
import { CommonService } from '../../core/services/common.service';
import { GridHelper } from '../helpers/grid-helper';
import { UserHelper } from '../helpers/user-helper';
import { AnimationHelper } from '../helpers/animation-helper';

@Injectable({
    providedIn: 'root'
})

export class BaseService {
    protected ch: CommonHelper;
    protected ah: AnimationHelper;
    public uh: UserHelper;
    protected httpHelper: HttpHelper;
    protected gh: GridHelper;
    protected cs: CommonService;

    constructor() {
        const injector = AppInjector.getInjector();
        this.ah = injector.get(AnimationHelper);
        this.uh = injector.get(UserHelper);
        this.gh=injector.get(GridHelper)
        this.ch = injector.get(CommonHelper);
        this.httpHelper = injector.get(HttpHelper);
        this.cs = injector.get(CommonService);
    }
}
