import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../models/ticket-model';
import { DataService } from '../data.service';
import { SeatsService, Seats } from '../../../webapp/app/entities/seats';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'jhi-seats-configure-page',
  templateUrl: './seats-configure-page.component.html',
  styleUrls: ['seats-configure-page.css']
})
export class SeatsConfigurePageComponent implements OnInit {

  public seatsVector: Array<number> = new Array<number>();
  private chosenSeats: Array<number> = new Array<number>();
  private occupiedSeats: Array<number> = new Array<number>();
  public ticket = new TicketModel();
  public ticketForPost = new TicketModel();
  private seat: Seats;
  private id_flight: number;
  private route_string: string;
  private type: number;
  private nrOfSeats: number;
  private nrOfSeatsOfPlane1: number;
  private nrOfSeatsOfPlane2: number;
  private nrOfSeatsOfPlane3: number;
  private nrOfSeatsOfPlane4: number;
  private shouldShowLoading: boolean;
  // private deniedSeats: Array<number> = new Array<number>();
  private localData: DataService;

  constructor(private data: DataService, private service: SeatsService) {
    this.shouldShowLoading = true;
  }

  getPlaneType() {
    return this.type;
  }

  checkOccupiedSeats() {
    // console.log(this.occupiedSeats);
    for (let id = 0; id <= this.nrOfSeats; id++) {
      const identifier1 = 'id' + id;
      const shand = document.getElementsByClassName(identifier1) as HTMLCollectionOf<HTMLElement>;
      if (this.occupiedSeats.indexOf(id) > -1) {
        shand[0].style.backgroundColor = '#D24D57';
      }
    }
  }

  checkChoosenSeats() {
    // console.log(this.occupiedSeats);
    if (this.chosenSeats.length > 0) {
      for (let i = 0; i < this.chosenSeats.length; i++) {
        const identifier1 = 'id' + this.chosenSeats[i];
        const shand = document.getElementsByClassName(identifier1) as HTMLCollectionOf<HTMLElement>;
        shand[0].style.backgroundColor = '#3199DA';
      }
    }
  }

  initialTicketConfiguration() {
    this.type = this.ticket.ticket_planeType;
    this.id_flight = this.ticket.ticket_flightID;
    this.route_string = this.ticket.ticket_departure + '-' + this.ticket.ticket_destination;

    if (this.type === 1) {
      this.nrOfSeats = this.nrOfSeatsOfPlane1;
    } else if (this.type === 2) {
      this.nrOfSeats = this.nrOfSeatsOfPlane2;
    } else if (this.type === 3) {
      this.nrOfSeats = this.nrOfSeatsOfPlane3;
    } else if (this.type === 4) {
      this.nrOfSeats = this.nrOfSeatsOfPlane4;
    }

    if (this.ticket.ticket_seats.length > 0) {
      for (let i = 0; i < this.ticket.ticket_seats.length; i++) {
        this.chosenSeats.push(this.ticket.ticket_seats[i]);
      }
    }
  }

  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);
    this.nrOfSeatsOfPlane1 = 369;
    this.nrOfSeatsOfPlane2 = 71;
    this.nrOfSeatsOfPlane3 = 174;
    this.nrOfSeatsOfPlane4 = 143;
    this.initialTicketConfiguration();
    for (let i = 0; i <= this.nrOfSeats; i++) {
      this.seatsVector.push(i);
    }
    this.queryOccupiedSeats();
  }

  queryOccupiedSeats() {
    this.shouldShowLoading = true;
    this.service.findByFlightId(this.ticket.ticket_flightID).subscribe((data) => {
      console.log(data);
      for (let i = 0; i < data.body.length; i++) {
        this.occupiedSeats.push(data.body[i].seat_index);
      }
      this.checkOccupiedSeats();
      this.checkChoosenSeats();
      this.shouldShowLoading = false;
    });
  }

  buttonClick(id) {
    const identifier1 = 'id' + id;
    const shand = document.getElementsByClassName(identifier1) as HTMLCollectionOf<HTMLElement>;
    if (this.occupiedSeats.indexOf(id) < 0) {
      if (this.chosenSeats.indexOf(id) < 0) {
        shand[0].style.backgroundColor = '#3199DA';
        this.chosenSeats.push(id);
      } else {
        shand[0].style.backgroundColor = '#A1CFEE';
        const index = this.chosenSeats.indexOf(id, 0);
        if (index > -1) {
          this.chosenSeats.splice(index, 1);
        }
      }
    }

    for (let i = 0; i < this.chosenSeats.length; i++) {
      console.log(this.chosenSeats[i]);
    }
    // this.reserveSelectedSeats();
  }

  saveSeats() {
    this.ticket.ticket_seats = new Array<number>();
    for (let i = 0; i < this.chosenSeats.length; i++) {
      this.ticket.ticket_seats.push(this.chosenSeats[i]);
    }
    this.data.updateTicket(this.ticket);
  }

  conversionSeat(seatNumber: number) {
    let numberPerRow: number;
    switch (this.type) {
      case 1: numberPerRow = 10; break;
      case 2: numberPerRow = 4; break;
      case 3: numberPerRow = 7; break;
      case 4: numberPerRow = 6; break;
      default: numberPerRow = 0;
    }
    const numberPerColumn = seatNumber % numberPerRow;
    return (Math.floor(seatNumber / numberPerRow) + 1) + String.fromCharCode(numberPerColumn + 65);
  }

  /**
  * https://puu.sh/AurCJ/551f01e693.png
  * for(i) {
  *  for (i){
  *  }
  *  for (i){
  *  }
  * }
  *  please install TSLint
  *  commented untill fix
  */
  reserveSelectedSeats() {
    const deniedSeats: Array<number> = new Array();
    this.service.findByFlightId(this.ticket.ticket_flightID).subscribe((data) => {
      console.log(data);
      for (let i = 0; i < data.body.length; i++) {
        if (this.ticket.ticket_seats.indexOf(data.body[i].seat_index) > -1) {
          deniedSeats.push(data.body[i].seat_index);
        }
      }
      if (deniedSeats.length === 0) {
        let newSeat: Seats;
        for (let j = 0; j < this.ticket.ticket_seats.length; j++) {
          newSeat = new Seats();
          newSeat.type = this.ticket.ticket_flightID;
          newSeat.seat_index = this.ticket.ticket_seats[j];
          newSeat.id_flight = this.ticket.ticket_planeType.toString();
          this.service.create(newSeat).subscribe();
        }
      } else {
        let message = 'These seats can not be reserved as they are already taken: ';
        for (let k = 0; k < deniedSeats.length; k++) {
          this.ticket.ticket_seats.slice(deniedSeats[k]);
          message = message + deniedSeats[k].toString() + ' ';
        }
        alert(message);
      }
    });
  }
}
