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
  private id_flight: string;
  private planeType: number;
  private nrOfSeats: number;
  private nrOfSeatsOfPlane1: number;
  private nrOfSeatsOfPlane2: number;
  private nrOfSeatsOfPlane3: number;
  private nrOfSeatsOfPlane4: number;
  private shouldShowLoading: boolean;
  private deniedSeats: Array<number> = new Array<number>();
  private localData: DataService;

  constructor(private data: DataService, private service: SeatsService) {
    this.shouldShowLoading = true;
  }

  modulo6(index) {
    if ((index + 1) % 6 === 0 && index !== 0) {
      return true;
    } else {
      return false;
    }
  }

  modulo3(index) {
    if ((index + 1) % 3 === 0) {
      return true;
    } else {
      return false;
    }
  }

  getPlaneType() {
    return this.planeType;
  }

  // spacing(index) {
  //   if (index === 29 || index === 65) {
  //     return true;
  //   }
  // }

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
    // this.planeType = this.ticket.ticket_planeType;
    // this.id_flight = this.ticket.ticket_flightID.toString();
    this.planeType = 4;             // this is hard coding for now
    this.id_flight = '123mv';       // this is hard coding for now

    if (this.planeType == 1)
      this.nrOfSeats = this.nrOfSeatsOfPlane1;
    else if (this.planeType == 2)
      this.nrOfSeats = this.nrOfSeatsOfPlane2;
    else if (this.planeType == 3)
      this.nrOfSeats = this.nrOfSeatsOfPlane3;
    else if (this.planeType == 4)
      this.nrOfSeats = this.nrOfSeatsOfPlane4;

    if (this.ticket.ticket_seats.length > 0) {
      for (let i = 0; i < this.ticket.ticket_seats.length; i++) {
        this.chosenSeats.push(this.ticket.ticket_seats[i]);
      }
    }
  }

  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);
    this.nrOfSeatsOfPlane1 = 107;
    this.nrOfSeatsOfPlane2 = 107;
    this.nrOfSeatsOfPlane3 = 107;
    this.nrOfSeatsOfPlane4 = 107;
    this.initialTicketConfiguration();
    for (let i = 0; i <= this.nrOfSeats; i++) {
      this.seatsVector.push(i);
    }
    this.queryOccupiedSeats();
  }

  queryOccupiedSeats() {
    this.shouldShowLoading = false;
    this.service.query({ id_flight: this.id_flight }).subscribe((data) => {
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
    this.ticket.ticket_seats = [];
    for (let i = 0; i < this.chosenSeats.length; i++) {
      this.ticket.ticket_seats.push(this.chosenSeats[i]);
    }
    this.data.updateTicket(this.ticket);
  }

  post_seats() {
    this.data.ticketInfo.subscribe((_data) => this.ticketForPost = _data);
    this.seat = new Seats();
    this.seat.type = this.ticketForPost.ticket_planeType;
    this.seat.id_flight = this.id_flight;
    for (let i = 0; i < this.ticketForPost.ticket_seats.length; i++) {
      this.seat.seat_index = this.ticketForPost.ticket_seats[i];
      this.service.create(this.seat).subscribe();
    }
  }
  reserveSelectedSeats() {
    let count = 0;
    for (let i = 0; i < this.ticket.ticket_seats.length; i++) {
      this.service.query({ id_flight: this.id_flight, seat_index: this.ticket.ticket_seats[i] })
        .subscribe((data) => {
          count++;
          console.log(data);
          if (data.status === 200) {
            this.deniedSeats.push(this.ticket.ticket_seats[i]);
            // return;
          }
          if (count === this.ticket.ticket_seats.length - 1) {
            if (this.deniedSeats.length === 0) {
              // toate locurile pot fi cumparate
              for (let i = 0; i < this.ticket.ticket_seats.length; i++) {
                this.seat = new Seats();
                this.seat.id_flight = this.ticket.ticket_flightID.toString();
                this.seat.seat_index = this.ticket.ticket_seats[i];
                this.service.create(this.seat);
              }
            } else {
              // exista locuri deja cumparate in lista de locuri rezervate
              let message = 'These seats can not be reserved as they are already taken: ';
              for (let i = 0; i < this.deniedSeats.length; i++) {
                message = message + this.deniedSeats[i].toString() + ' ';
              }
              alert(message);
            }
          }
        })
    }
  }
}

