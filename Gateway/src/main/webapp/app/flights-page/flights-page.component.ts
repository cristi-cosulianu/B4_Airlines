import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TicketModel } from '../models/ticket-model';
import {HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'jhi-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: [
    './flights-page.component.css'
]
})
export class FlightsPageComponent implements OnInit {
  public ticket = new TicketModel();
  constructor(private data: DataService , private http: HttpClient) {

  }
  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);
  }

  sendSubmision() {
    const departure = (<HTMLInputElement>document.getElementById('departure')).value;
    const destination = (<HTMLInputElement>document.getElementById('destination')).value;
	this.http.get('http://localhost:8050/flights/' + departure + '/' + destination).subscribe(data => {
      console.log(data);
    });
  }
}
