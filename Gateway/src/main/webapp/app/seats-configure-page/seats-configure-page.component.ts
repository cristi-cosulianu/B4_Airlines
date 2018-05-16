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

  public numbers1to6: Array<number> = new Array<number>();
  public numbers7to12: Array<number> = new Array<number>();
  public numbers13to18: Array<number> = new Array<number>();
  public numbers19to24: Array<number> = new Array<number>();
  public numbers25to30: Array<number> = new Array<number>();
  public numbers31to36: Array<number> = new Array<number>();
  public numbers37to42: Array<number> = new Array<number>();
  public numbers43to48: Array<number> = new Array<number>();
  public numbers49to54: Array<number> = new Array<number>();
  public numbers55to60: Array<number> = new Array<number>();
  public numbers61to66: Array<number> = new Array<number>();
  public numbers67to72: Array<number> = new Array<number>();
  public numbers73to78: Array<number> = new Array<number>();
  public numbers79to84: Array<number> = new Array<number>();
  public numbers85to90: Array<number> = new Array<number>();
  public numbers91to96: Array<number> = new Array<number>();
  public numbers97to102: Array<number> = new Array<number>();
  public numbers103to108: Array<number> = new Array<number>();
  public numbers1to108: Array<number> = new Array<number>();
  private chosenSeats: Array<number> = new Array<number>();
  private occupiedSeats: Array<number> = [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97, 103];
  public ticket = new TicketModel();
  public indexSeat = 1;
  // private id_flight: string = '123MV';
  // private planeType: number = 1;
  private seat: Seats;
  constructor(private data: DataService, private service: SeatsService) {

  }

  checkOccupiedSeats() {
    for (let id = 1; id <= 108; id++) {
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

    for (let i = 1; i <= 108; i++) {
      this.numbers1to108.push(i);
    }

    for (let i = 1; i <= 6; i++) {
      this.numbers1to6.push(i);
    }
    for (let i = 7; i <= 12; i++) {
      this.numbers7to12.push(i);
    }
    for (let i = 13; i <= 18; i++) {
      this.numbers13to18.push(i);
    }
    for (let i = 19; i <= 24; i++) {
      this.numbers19to24.push(i);
    }
    for (let i = 25; i <= 30; i++) {
      this.numbers25to30.push(i);
    }
    for (let i = 31; i <= 36; i++) {
      this.numbers31to36.push(i);
    }
    for (let i = 37; i <= 42; i++) {
      this.numbers37to42.push(i);
    }
    for (let i = 43; i <= 48; i++) {
      this.numbers43to48.push(i);
    }
    for (let i = 49; i <= 54; i++) {
      this.numbers49to54.push(i);
    }
    for (let i = 55; i <= 60; i++) {
      this.numbers55to60.push(i);
    }
    for (let i = 61; i <= 66; i++) {
      this.numbers61to66.push(i);
    }
    for (let i = 67; i <= 72; i++) {
      this.numbers67to72.push(i);
    }
    for (let i = 73; i <= 78; i++) {
      this.numbers73to78.push(i);
    }
    for (let i = 79; i <= 84; i++) {
      this.numbers79to84.push(i);
    }
    for (let i = 85; i <= 90; i++) {
      this.numbers85to90.push(i);
    }
    for (let i = 91; i <= 96; i++) {
      this.numbers91to96.push(i);
    }
    for (let i = 97; i <= 102; i++) {
      this.numbers97to102.push(i);
    }
    for (let i = 103; i <= 108; i++) {
      this.numbers103to108.push(i);
    }
  }

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
