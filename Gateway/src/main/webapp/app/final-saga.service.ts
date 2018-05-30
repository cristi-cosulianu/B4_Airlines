import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TicketModel } from './models/ticket-model';
import { SeatsService, Seats } from './entities/seats';

@Injectable()
export class FinalSagaService {

  private ticket: TicketModel;

  constructor(
    private dataService: DataService,
    private service: SeatsService) { }

  finaliseTransaction() {
    this.dataService.ticketInfo.subscribe((data) => this.ticket = data);

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
        // save
        return true;
      } else {
        let message = 'These seats can not be reserved as they are already taken: ';
        for (let k = 0; k < deniedSeats.length; k++) {
          this.ticket.ticket_seats.slice(deniedSeats[k]);
          message = message + deniedSeats[k].toString() + ' ';
        }
        alert(message);
        return false;
        // fail
      }
    });
    return false;
  }
}
