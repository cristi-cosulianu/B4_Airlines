import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TicketModel } from '../models/ticket-model';

@Component({
  selector: 'jhi-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: [
    './flights-page.component.css'
]
})
export class FlightsPageComponent implements OnInit {
  public ticket = new TicketModel();
  constructor(private data: DataService) {

  }

  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);
  }

  sendSubmision() {
    const departure = (<HTMLInputElement>document.getElementById('departure')).value;
    const destination = (<HTMLInputElement>document.getElementById('destination')).value;
    console.log(departure);
    console.log(destination);
  }
}
