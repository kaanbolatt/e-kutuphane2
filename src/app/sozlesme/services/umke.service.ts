
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/bases/base.service';

@Injectable({
  providedIn: 'root'
})
export class UmkeService extends BaseService {
  ticketController = 'Ticket';


  constructor() {
    super();
  }

  addTicket(model: any) {
    return this.httpHelper.post(this.ticketController, 'TicketAdd', model);
  }
  ticketUpdate(model: any) {
    return this.httpHelper.post(this.ticketController, 'TicketUpdate', model);
  }
  deleteTicketById(id: number) {
    return this.httpHelper.delete(this.ticketController, 'CallDelete', id);
  }
  ticketListForGrid() {
    return this.httpHelper.get(this.ticketController, 'TicketListForGrid', this.gh.createParams(this.gh.getGridFilter(), this.gh.getSearchFilter()));
  }
  getTicketDetails(Ids) {
    return this.httpHelper.get<any>(this.ticketController, 'TicketDetail', this.gh.createParams(Ids))
  }
  getTicketStatistics(inst) {
    return this.httpHelper.get<any>(this.ticketController, 'TicketStatistics', this.gh.createParams(inst))
  }
  downloadTicketFile(content: string, fileName: string, format: string) {
    return this.httpHelper.convertBase64ToBlob(content, fileName, format);
  }
  IsTicketLocked(model) {
    return this.httpHelper.post<any>(this.ticketController, 'IsTicketLocked', model)
  }
  UnLockTicket(model) {
    return this.httpHelper.post<any>(this.ticketController, 'UnLockTicket', model)
  }
}
