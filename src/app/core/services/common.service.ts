import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpHelper } from './http-helper.service';
import { GridHelper } from 'src/app/shared/helpers/grid-helper';

@Injectable()
export class CommonService {
  commonControllerName = 'Common';
  constructor(
    private httpHelper: HttpHelper,
    private gh: GridHelper) { }

  //#region Tanimlar
  getUlkeTanimlari() {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetUlkeTanimlari');
  }

  getIlTanimlari(bolgeKodu: number = null) {
    const sistemKodu = 1;
    const language = 2;

    if (bolgeKodu > 0) {
      return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetIlTanimlari', this.gh.createParams({ bolgeKodu }));
    }
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetIlTanimlari', this.gh.createParams({ sistemKodu, language }));
  }

  getIlByIlKodu(cityCode: any) {
    return this.httpHelper.get<SelectItem>(this.commonControllerName, 'CityByCityCode', this.gh.createParams({ cityCode }));
  }

  getIlceTanimlari(ilKodu: number) {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetIlceTanimlari', this.gh.createParams({ ilKodu }));
  }

  getIlceTanimlariByIlList(ilKodlari: number[]) {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetIlceTanimlariByIlList', this.gh.createParams({ ilKodlari }));
  }

  getKurumTanimlari(ilKodu: number = null, ilceKodu: number = null, kurumTuruKodlari: number[] = [], kurumTurKodu: number = null) {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetKurumTanimlari', this.gh.createParams({ ilKodu, ilceKodu, kurumTuruKodlari, kurumTurKodu }));
  }

  getTumKurumTanimlari(ilKodlari: number[], kurumTuruKodlari: any[] = null) {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetTumKurumTanimlari', this.gh.createParams({ ilKodlari, kurumTuruKodlari }));
  }

  getKurumTuruTanimlari() {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'GetKurumTuruTanimlari');
  }

  getIlceListesi() {
    return this.httpHelper.get<SelectItem[]>(this.commonControllerName, 'DistrictListForAutoComplete');
  }

  getIlceListesiByCityCode(cityId: number) {
    return this.httpHelper.get<any[]>(this.commonControllerName, 'DistrictListByCityCode', this.gh.createParams({ cityId }));
  }

  cityList() {
    return this.httpHelper.get<any[]>(this.commonControllerName, 'CityList');
  }

  getDistrictForAutoComplete() {
    return this.httpHelper.get<any[]>(this.commonControllerName, 'DistrictList');
  }

  getFaqList(inst) {
    return this.httpHelper.get<any>(this.commonControllerName, 'FaqListForGrid', this.gh.createParams(inst));
  }
  changeFaqState(id: number) {
    const param={"id":id}
    return this.httpHelper.get<any>(this.commonControllerName, 'FaqStateChange', this.gh.createParams({ id }));
  }
  getFaqListForGrid() {
    return this.httpHelper.get<any>(this.commonControllerName, 'FaqListForGrid', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }
  faqAddOrUpdate(model) {
    return this.httpHelper.post<any>(this.commonControllerName, 'FaqAddOrUpdate', model);
  }
  annouceAddOrUpdate(model) {
    return this.httpHelper.post<any>(this.commonControllerName, 'AnnouncementAddOrUpdate', model);
  }
  getAnnouncementListForGrid() {
    return this.httpHelper.get<any>(this.commonControllerName, 'AnnouncementListForGrid',this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()) );
  }
  deleteFaq(id:number) {
    return this.httpHelper.delete<any>(this.commonControllerName, 'FaqDelete',id);
  } 
  announcementDelete(id:number) {
    return this.httpHelper.delete<any>(this.commonControllerName, 'AnnouncementDelete',id);
  }
  getKurumList(inst) {
    return this.httpHelper.get<any[]>(this.commonControllerName, 'InstitutionList', this.gh.createParams(inst));
  }
}
