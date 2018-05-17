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
  private occupiedSeats: Array<number> = new Array<number>();
  public ticket = new TicketModel();
  public indexSeat = 1;
  private id_flight: String = '123mv';
  // private planeType: number = 1;
  private seat: Seats;
  private shouldShowLoading: boolean;
  constructor(private data: DataService, private service: SeatsService) {
    this.shouldShowLoading = false;
  }

  modulo6(index) {
    if (index % 6 === 0) {
      return true;
    } else {
      return false;
    }
  }

  // spacing(index) {
  //   if (index === 29 || index === 65) {
  //     return true;
  //   }
  // }

  checkOccupiedSeats() {
    for (let id = 0; id <= 107; id++) {
      const identifier1 = 'id' + id;
      const shand = document.getElementsByClassName(identifier1) as HTMLCollectionOf<HTMLElement>;
      if (this.occupiedSeats.indexOf(id) > -1) {
        shand[0].style.backgroundColor = '#D24D57';
      }
    }
  }

  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);

    for (let i = 0; i <= 107; i++) {
      this.numbers0to107.push(i);
    }
    this.shouldShowLoading = true;
    this.service.query({ id_flight: this.id_flight }).subscribe((data) => {
      console.log(data);
      for (let i = 0; i < data.body.length; i++) {
        this.occupiedSeats.push(data.body[i].seat_index);
      }
      this.checkOccupiedSeats();
      this.shouldShowLoading = false;
    });
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
    if (this.occupiedSeats.indexOf(id) < 0) { //daca nu este deja rezervat
      if (this.chosenSeats.indexOf(id) < 0) { // daca nu a fost selectat anterior
        shand[0].style.backgroundColor = '#3199DA';
        this.chosenSeats.push(id);
      } else { //  else if(this.occupiedSeats.indexOf(id) < 0 && this.chosenSeats.indexOf(id) > 0) /*if (shand[0].style.backgroundColor === '#3199DA')*/ {
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
  }

  saveSeats() {
    // this.seat = new Seats();
    // this.seat = new Seats();
    // this.seat.id_flight = '123mv';
    // this.seat.type = 3;
    // this.seat.seat_index = 0;
    // this.service.create(this.seat).subscribe();
    // this.service.delete()

    // this.service.query('id_flight=123mv').subscribe();
    // this.service.find(952).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
