
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/bases/base.service';
import { SelectItem } from 'primeng/api';
import { PublicationListRequest } from 'src/app/shared/interfaces/publication-list-request';

@Injectable({
  providedIn: 'root'
})
export class KutuphaneService extends BaseService {
  kutuphaneController = 'KutuphaneYonetimi';

  constructor() {
    super();
  }
  addPublication(model: any) {
    return this.httpHelper.post(this.kutuphaneController, 'PublicationAddOrUpdate', model);
  }
  deletePublication(id: number) {
    return this.httpHelper.delete(this.kutuphaneController, 'DeletePublication', id);
  }
  publicationList(model: PublicationListRequest) {
    return this.httpHelper.post<any[]>(this.kutuphaneController, 'PublicationList', model);
  }

  getPublicationById(id: number) {
    return this.httpHelper.get<any>(this.kutuphaneController, 'GetPublicationById', this.gh.createParams({ id: id }));
  }

  articleTypeList(definitionType: number) {
    return this.httpHelper.get<SelectItem[]>(this.kutuphaneController, 'ArticleTypeList', this.gh.createParams({ definitionType }));
  }

  addArticleType(model: any) {
    return this.httpHelper.post(this.kutuphaneController, 'ArticleAddOrUpdate', model);
  }

  addUnit(model: any) {
    return this.httpHelper.post(this.kutuphaneController, 'UnitAddOrUpdate', model);
  }

  unitList() {
    return this.httpHelper.get<any>(this.kutuphaneController, 'UnitList', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }

  communicationList() {
    return this.httpHelper.get<any>(this.kutuphaneController, 'CommunicationListForGrid', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }

  bannerTextList() {
    return this.httpHelper.get<any>(this.kutuphaneController, 'BannerTextListForGrid', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }

  saveBanner(model: any) {
    return this.httpHelper.post(this.kutuphaneController, 'BannerAddOrUpdate', model);
  }


  deleteBannerTextById(id: number) {
    return this.httpHelper.delete(this.kutuphaneController, 'DeleteBannerText', id);
  }

  getBannerById(id: number) {
    return this.httpHelper.get<any>(this.kutuphaneController, 'GetBanner', this.gh.createParams({ id }));
  }


}
