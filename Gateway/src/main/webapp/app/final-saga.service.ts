import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TicketModel } from './models/ticket-model';
import { OrderModel } from './models/order.model';
import { SeatsService, Seats } from './entities/seats';
import { CardService, Card } from './entities/card';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { BankService, Bank } from './entities/bank';
import { FlightsService, Flights } from './entities/flights';
import { OrderHistory, OrderHistoryService } from './entities/order-history';
import { Transaction } from './models/transaction.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FinalSagaService {

  private ticket: TicketModel;
  private order: OrderModel;
  private seatsOccupied: boolean;
  private deniedSeats: Array<number> = new Array();
  private orderHistory: OrderHistory;
  private bank: Bank;
  private card: Card;
  private transaction: Transaction;
  private data: any;
  private paymentMessage: {
    status: number,
    message: string
  };
  public paymentResult: Observable<any> = Observable.of(this.paymentMessage);

  constructor(
    private dataService: DataService,
    private seatsService: SeatsService,
    private orderHistoryService: OrderHistoryService,
    private bankService: BankService,
    private cardService: CardService
  ) { }

  // finaliseTransaction() {
  //   this.dataService.ticketInfo.subscribe((data) => this.ticket = data);
  //
  //   this.service.findByFlightId(this.ticket.ticket_flightID).subscribe((data) => {
  //     console.log(data);
  //     for (let i = 0; i < data.body.length; i++) {
  //       if (this.ticket.ticket_seats.indexOf(data.body[i].seat_index) > -1) {
  //         deniedSeats.push(data.body[i].seat_index);
  //       }
  //     }
  //     if (deniedSeats.length === 0) {
  //       let newSeat: Seats;
  //       for (let j = 0; j < this.ticket.ticket_seats.length; j++) {
  //         newSeat = new Seats();
  //         newSeat.type = this.ticket.ticket_flightID;
  //         newSeat.seat_index = this.ticket.ticket_seats[j];
  //         newSeat.id_flight = this.ticket.ticket_planeType.toString();
  //         this.service.create(newSeat).subscribe();
  //       }
  //       // save
  //       return true;
  //     } else {
  //       let message = 'These seats can not be reserved as they are already taken: ';
  //       for (let k = 0; k < deniedSeats.length; k++) {
  //         this.ticket.ticket_seats.slice(deniedSeats[k]);
  //         message = message + deniedSeats[k].toString() + ' ';
  //       }
  //       alert(message);
  //       return false;
  //       // fail
  //     }
  //   });
  //   return false;
  // }

  finaliseTransaction() {
    this.dataService.ticketInfo.subscribe((data) => this.ticket = data);
    const deniedSeats: Array<number> = new Array();
    this.seatsService.findByFlightId(this.ticket.ticket_flightID).subscribe((data) => {
      // this.updateSeats(data);
      this.data = data;
      this.transaction = new Transaction(this.order.cardNumber,
      this.order.cardExpirationYear,
      this.order.cardExpirationMonth,
      this.order.cardOwnerName,
      this.order.cardCCV,
      this.ticket.ticket_price,
      false
      );
      this.updateBank(this.transaction);
    });
  }

  updateSeats(data: any): void {
    console.log(data);
      for (let i = 0; i < data.body.length; i++) {
        if (this.ticket.ticket_seats.indexOf(data.body[i].seat_index) > -1) {
          this.deniedSeats.push(data.body[i].seat_index);
        }
      }
      if (this.deniedSeats.length === 0) {
        let newSeat: Seats;
        for (let j = 0; j < this.ticket.ticket_seats.length; j++) {
          newSeat = new Seats();
          newSeat.type = this.ticket.ticket_flightID;
          newSeat.seat_index = this.ticket.ticket_seats[j];
          newSeat.id_flight = this.ticket.ticket_planeType.toString();
          this.seatsService.create(newSeat).subscribe();
        }
        this.paymentMessage = {status: 200, message: 'Order updated successfully'};
        // save
        // return true;
      } else {
        let message = 'These seats can not be reserved as they are already taken: ';
        for (let k = 0; k < this.deniedSeats.length; k++) {
          this.ticket.ticket_seats.slice(this.deniedSeats[k]);
          message = message + this.deniedSeats[k].toString() + ' ';
        }
        alert(message);
        this.paymentMessage = {status: 404, message: 'Seats are already taken'};
        // return false;
        // fail
      }
  }
  updateBank(transaction: Transaction): void {
    this.bankService.updateBankAmount(transaction).subscribe(
      (res: HttpResponse<Bank>) => {
        console.log('Updated succesfully! ' + res.body.id + res.body.amount);
        this.card = new Card(
          null,
          this.order.cardNumber,
          this.order.cardExpirationMonth,
          this.order.cardExpirationYear,
          this.order.cardOwnerName,
          this.order.cardCCV,
          this.order.cardType
        );
        this.updateCard(this.card);
      },
      (res: HttpErrorResponse) => {
        // rollback
        if (res.status === 304) {
          // this.target_popup(404, 'Insuficient funds!');
          this.paymentMessage = {status: 404, message: 'Insufficient funds!'};

        } else if (res.status === 404) {
          this.paymentMessage = {status: 404, message: 'Card not found!'};
        } else {
          // this.target_popup(404, 'Update transaction error ' + res.status);
          this.paymentMessage = {status: 404, message: 'Update transaction error ' + res.status};
        }
        this.paymentCompensation();
        // this.jhiAlertService.error(res.message, null, null);
      }
    );
  }

  updateCard(card: Card): void {
    this.cardService.update(card).subscribe(
      (res: HttpResponse<Card>) => {
        console.log('Card updated succesfully! ' + res.body.id);
        this.card = res.body;
        let i = 0;
        this.orderHistory = new OrderHistory(
          null,
          this.ticket.ticket_userID,
          this.ticket.ticket_flightID,
          this.ticket.ticket_planeType,
          this.ticket.ticket_price,
          this.order.specialNeeds.indexOf(i++) > -1,
          this.order.specialNeeds.indexOf(i++) > -1,
          this.order.specialNeeds.indexOf(i++) > -1,
          this.order.specialNeeds.indexOf(i++) > -1,
          this.order.specialNeeds.indexOf(i) > -1,
          this.card.id
        );
        this.updateOrderHistory(this.orderHistory);
      },
      (res: HttpErrorResponse) => {
        // this.target_popup(404, 'Card error ' + res.status);
        this.paymentMessage = {status: 404, message: 'Card error ' + res.status};
        // rollback
        this.paymentCompensation(this.transaction);
        // this.jhiAlertService.error(res.message, null, null);
      }
    );
  }

  updateOrderHistory(order: OrderHistory): void {
    this.orderHistoryService.update(order).subscribe(
      (res: HttpResponse<OrderHistory>) => {
        console.log('Order updated succesfully! ' + res.body.id);
        // this.target_popup(200, 'Succesful transaction !');
        this.orderHistory = res.body;
        this.updateSeats(this.data);
      },
      (res: HttpErrorResponse) => {
        // this.target_popup(404, 'OrderHistory error ' + res.status);
        this.paymentMessage = {status: 404, message: 'OrderHistory error ' + res.status};
        // rollback
        this.paymentCompensation(this.transaction, this.card);
        // this.jhiAlertService.error(res.message, null, null);
      }
    );
  }

  private paymentCompensation(transaction?: Transaction, card?: Card, history?: OrderHistory) {
    // Work in progress
    let message = 'Rollback ';
    if (transaction !== undefined) {
      this.bankCompensation(transaction);
      message = message + ' Bank Account';
    }
    if (card !== undefined) {
      this.cardCompensation(card);
      message = message + ', Card';
    }
    if (history !== undefined) {
      this.historyCompensation(history);
      message = message + ', Order';
    }
    // this.target_popup(0, message);
  }

  historyCompensation(history: OrderHistory): void {
    this.orderHistoryService.delete(history.id).subscribe((res: HttpResponse<any>) => {
      // history = false;
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
      this.historyCompensation(history);
    });
  }

  cardCompensation(card: Card): void {
    this.cardService.delete(card.id).subscribe((res: HttpResponse<any>) => {
      // card = false;
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
      this.cardCompensation(card);
    });
  }

  // Posibil sa fie nevoie de pasi aditionali aici
  bankCompensation(transaction: Transaction): void {
    transaction.isReversed = true;
    this.bankService.updateBankAmount(transaction).subscribe((res: HttpResponse<Bank>) => {
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
      this.bankCompensation(transaction);
    });
  }

}
