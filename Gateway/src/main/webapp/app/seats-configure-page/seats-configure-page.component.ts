import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../models/ticket-model';
import { DataService } from '../data.service';

@Component({
  selector: 'jhi-seats-configure-page',
  templateUrl: './seats-configure-page.component.html',
  styleUrls: ['seats-configure-page.css']
})
export class SeatsConfigurePageComponent implements OnInit {
  public ticket = new TicketModel();
  constructor(private data: DataService) {

  }

  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);
  }

}
