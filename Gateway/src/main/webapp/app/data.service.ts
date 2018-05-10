import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TicketModel } from './models/ticket-model';

@Injectable()
export class DataService {
    private ticket = new BehaviorSubject<TicketModel>(new TicketModel());
    public ticketInfo = this.ticket.asObservable();

    constructor() { }

    updateTicket(newTicket) {
        this.ticket.next(newTicket);
    }
}
