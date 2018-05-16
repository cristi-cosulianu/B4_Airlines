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

  public numbers0to107: Array<number> = new Array<number>();
  private chosenSeats: Array<number> = new Array<number>();
  private occupiedSeats: Array<number> = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102];
  public ticket = new TicketModel();
  public indexSeat = 1;
  // private id_flight: string = '123MV';
  // private planeType: number = 1;
  private seat: Seats;
  constructor(private data: DataService, private service: SeatsService) {

  }

  modulo6(index) {
    if (index % 6 === 0) {
      return true;
    } else {
      return false;
    }
  }

  modulo3(index) {
    if (index % 3 === 0) {
      return true;
    } else {
      return false;
    }
  }

  checkOccupiedSeats() {
    for (let id = 0; id <= 107; id++) {
      const identifier1 = 'id' + id;
      const shand = document.getElementsByClassName(identifier1) as HTMLCollectionOf<HTMLElement>;
      if (this.occupiedSeats.indexOf(id) > -1) {
        shand[0].style.backgroundColor = ' red ';
      }
    }
  }

  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);

    for (let i = 0; i <= 107; i++) {
      this.numbers0to107.push(i);
    }

    // this.createSpaces();
  }

  // createSpaces() {
  //   for (let i = 0; i <= 107; i++) {
  //     if (this.numbers0to107[i] % 3 === 0) {
  //       const btn = document.getElementsByClassName('id' + i) as HTMLCollectionOf<HTMLElement>;
  //       btn[0].style.paddingLeft = '20px';
  //     }
  //   }
  // }

  buttonClick(id) {
    const identifier1 = 'id' + id;
    const shand = document.getElementsByClassName(identifier1) as HTMLCollectionOf<HTMLElement>;
    if (shand[0].style.backgroundColor !== 'orange' && this.occupiedSeats.indexOf(id) < 0) {
      shand[0].style.backgroundColor = ' orange ';
      this.chosenSeats.push(id);
    } else {
      shand[0].style.backgroundColor = ' green ';
      const index = this.chosenSeats.indexOf(id, 0);
      if (index > -1) {
        this.chosenSeats.splice(index, 1);
      }
    }
    for (let i = 0; i < this.chosenSeats.length; i++) {
      console.log(this.chosenSeats[i]);
    }
  }

  saveSeats() {
    // private occupiedSeats: Array<number> = [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97, 103];
    // this.seat = new Seats(1, 12, this.id_flight.toString(), 1);
    this.seat = new Seats();
    this.seat.id_flight = '123mv';
    this.seat.type = 2;
    this.seat.seat_index = 10;
    this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 7;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 13;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 19;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 31;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 37;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 43;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 49;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 55;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 61;
    // this.service.create(this.seat).subscribe();
    // this.seat.loc_index = 67;
    // this.service.create(this.seat).subscribe();
    // for(let i=0; i < this.chosenSeats.length; i++){
    // this.seat.seat_index=this.chosenSeats[i];
    // this.seat.id=i+2;
    // this.service.create(this.seat).subscribe();
    // }
    // this.service.delete()

    // this.service.query('id_flight=123mv').subscribe();
    this.service.find(952).subscribe((data) => {
      console.log(data);
    });
  }
}
