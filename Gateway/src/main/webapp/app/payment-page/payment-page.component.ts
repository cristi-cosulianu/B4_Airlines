import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITicket } from './tikerPassengerInfo.interface';
import { CardService } from '../entities/card/card.service';
import { Card } from '../entities/card/card.model';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { BankService } from '../entities/bank';
import { TicketModel } from '../models/ticket-model';
import { DataService } from '../data.service';
import { FlightsService } from '../entities/flights/flights.service';
import { Flights } from '../entities/flights';
import { Userinfo } from '../entities/userinfo/userinfo.model';
import { Bank } from '../entities/bank/bank.model';
import { resolveSoa } from 'dns';
import { OrderHistory, OrderHistoryService } from '../entities/order-history';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'jhi-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {

  passengerIDInfos: any = {
    firstName: '',
    lastName: '',
    sex: 'Male',
    date: '',
    phoneNo: '',
    email: '',
    specialNeeds: Array<number>(),
    card: {
      id: '1',
      number: '',
      expirationDate: '',
      expirationYear: '',
      expirationMonth: '',
      name: '',
      cvv: '',
      cardType: 'Debit card'
    }
  };

  private ticket;
  private flight: Flights;
  private user: Userinfo;
  private order: OrderHistory;
  private bank: Bank;
  private card: Card;
  private transaction: Transaction;

  showInfoForm = false;
  private ticketPrice: number;
  private totalPrice: number;
  optionalNeeds: any = [
    { name: 'Blind', value: 10.07 },
    { name: 'Deaf', value: 20.14 },
    { name: 'Congnitive disability', value: 25.17 },
    { name: 'Other disability', value: 0 },
    { name: 'Service animal', value: 12.58 }
  ];

  flightInfos: ITicket = {
    flightDate: '29/02/1996',
    departLocation: 'London',
    landLocation: 'Bucharest',
    stops: 1,
    departTime: '16:30',
    landTime: '18:30'
  };

  getText: any = {
    'back': 'Change selected seat',
    'title': 'Fill in the form below',
    // tslint:disable-next-line:max-line-length
    'subTitle': 'To​​ comply with the TSA Secure Flight program, the traveler information listed here must exactly match the information on the government - issued photo ID that the traveler presents at the airport.',
    'form': [
      { 'title': 'Passengers' },
      {
        'title': 'Passenger contact information',
        // tslint:disable-next-line:max-line-length
        'subTitle': 'Please let us know the best way to reach you during travel, for important flight status updates or notifications. Our team will use this information to contact you with updates about your travel, if necessary.'
      },
      {
        'title': 'Special passenger needs (Optional)',
        'optionsCheckbox': [
          'Blind',
          'Deaf',
          'Congnitive disability',
          'Other disability requiring assistance',
          'Service animal'
        ]
      },
      {
        'title': 'Payment',
        'optionsRadio': [
          'Credit card',
          'Debit card'
        ]
      }
    ],
    'formID': {
      'firstName': 'First name',
      'lastName': 'Last name',
      'middleName': 'Middle name',
      'sex': [
        'Sex',
        'Male',
        'Female',
      ],
      'date': 'Date of birth'
    },
    'formCard': {
      'name': 'Name on card',
      'number': 'Credit card number',
      'exp': 'Expiration',
      'cvv': 'CVV'
    },
    'checkCart': {
      'ticket': 'Ticket (' + 1 + ')',
      'specialNeeds': Array<number>(),
      'total': 'Total',
      'totalSmall': 'Including taxes and fees',
      'departed': 'Departed'
    }
  };

  constructor(private cardService: CardService,
    private jhiAlertService: JhiAlertService,
    private bankService: BankService,
    private dataService: DataService,
    private flightsService: FlightsService,
    private orderHistoryService: OrderHistoryService
  ) { }

  // Recomandat de facut initializarile aici
  ngOnInit() {
    // Raman de luat locurile si tipul avionului din ticket
    this.dataService.ticketInfo.subscribe((ticket: TicketModel) => {
      this.ticket = ticket;
    }, () => {
      this.paymentCompensation();
    });
    this.flightsService.find(this.ticket.ticket_flightID).subscribe((flight: HttpResponse<Flights>) => {
      this.flight = flight.body;
    }, () => {
      this.paymentCompensation();
    });
    this.dataService.user.subscribe((_data) => this.user);
    // this.ticketPrice = this.flight.priceRangeMax;
    // this.totalPrice = this.ticketPrice * this.ticket.ticket_seats.length;
    this.totalPrice = 500;
    this.flightInfos.departLocation = this.flight.departure;
    this.flightInfos.departTime = this.flight.departureTime;
    this.flightInfos.landLocation = this.flight.arrival;
    this.flightInfos.landTime = this.flight.arrivalTime;
    this.flightInfos.flightDate = this.flight.company;
  }

  // submit() {
  //   this.transaction = new Transaction(
  //     this.passengerIDInfos.card.number,
  //     this.passengerIDInfos.card.expirationYear,
  //     this.passengerIDInfos.card.expirationMonth,
  //     this.passengerIDInfos.card.name,
  //     this.passengerIDInfos.card.cvv,
  //     this.totalPrice
  //   );
  //   if ( this.updateBank(this.transaction) ) {
  //     this.card = new Card(
  //       null,
  //       this.passengerIDInfos.card.number,
  //       this.passengerIDInfos.card.number,
  //       this.passengerIDInfos.card.expirationYear,
  //       this.passengerIDInfos.card.name,
  //       this.passengerIDInfos.card.cvv,
  //       this.passengerIDInfos.card.cardType
  //     );
  //     if ( this.updateCard(this.card) ) {
  //       let i = 0;
  //       this.order = new OrderHistory(
  //         null,
  //         this.ticket.ticket_userID,
  //         this.ticket.ticket_flightID,
  //         this.ticket.ticket_planeType,
  //         this.totalPrice,
  //         this.passengerIDInfos.specialNeeds.indexOf(i++) > -1,
  //         this.passengerIDInfos.specialNeeds.indexOf(i++) > -1,
  //         this.passengerIDInfos.specialNeeds.indexOf(i++) > -1,
  //         this.passengerIDInfos.specialNeeds.indexOf(i++) > -1,
  //         this.passengerIDInfos.specialNeeds.indexOf(i) > -1,
  //         this.card.id
  //       );
  //       this.updateOrderHistory(this.order);
  //     }
  //   }
  // }

  updateBank(transaction: Transaction): boolean {
    this.bankService.updateBankAmount(transaction).subscribe(
      (res: HttpResponse<Bank>) => {
        console.log('Updated succesfully! ' + res.body.id + res.body.amount);
        return true;
      },
      (res: HttpErrorResponse) => {
        console.log('Bank Error!');
        // rollback
        this.paymentCompensation();
        this.jhiAlertService.error(res.message, null, null);
        return false;
      }
    );
    return false;
  }

  updateCard(card: Card): boolean {
    this.cardService.update(card).subscribe(
      (res: HttpResponse<Card>) => {
        console.log('Card updated succesfully! ' + res.body.id);
        this.card = res.body;
        return true;
      },
      (res: HttpErrorResponse) => {
        console.log('Card Error!');
        // rollback
        this.paymentCompensation(this.bank);
        this.jhiAlertService.error(res.message, null, null);
        return false;
      }
    );
    return false;
  }

  updateOrderHistory(order: OrderHistory): boolean {
    this.orderHistoryService.update(order).subscribe(
      (res: HttpResponse<OrderHistory>) => {
        console.log('Order updated succesfully! ' + res.body.id);
        this.order = res.body;
        return true;
      },
      (res: HttpErrorResponse) => {
        console.log('OrderHistory Error!');
        // rollback
        this.paymentCompensation(this.bank, this.card);
        this.jhiAlertService.error(res.message, null, null);
        return false;
      }
    );
    return false;
  }

  private paymentCompensation(transaction?: Transaction, card?: Card, history?: OrderHistory) {
    // Work in progress
    const message = 'Something went wrong. Sorry! \n';
    if (transaction !== undefined) {
      this.bankCompensation(transaction);
      // message = message + 'Bank Account';
    }
    if (card !== undefined) {
      this.cardCompensation(card);
      // message = message + 'msg2';
    }
    if (history !== undefined) {
      this.historyCompensation(history);
      // message = message + 'msg3';
    }
    // De afisat mesaj de eroare pe front end ?
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
    this.bankService.updateBankAmount(transaction).subscribe((res: HttpResponse<Bank>) => {

    }, (error: HttpErrorResponse) => {
      console.log(error.message);
      this.bankCompensation(transaction);
    });
  }

  toggleInfoForm(selectedValue): void {
    this.showInfoForm = selectedValue;
  }

  selectChangedHandler(event: any): void {
    this.passengerIDInfos.sex = event.target.value;
  }

  onSelectionChangeCard(event: any): void {
    this.passengerIDInfos.card.cardType = event.target.value;
    this.passengerIDInfos.card.id = event.target.id;
  }

  onSelectionChangeNeeds(event: any): void {
    const index = this.passengerIDInfos.specialNeeds.indexOf(event.target.id, 0);
    const indexOptions = this.getText.checkCart.specialNeeds.indexOf(event.target.id, 0);
    if (index > -1) {
      this.passengerIDInfos.specialNeeds.splice(index, 1);
      this.getText.checkCart.specialNeeds.splice(index, 1);
      this.totalPrice -= this.optionalNeeds[event.target.id].value;
    } else {
      this.passengerIDInfos.specialNeeds.push(event.target.id);
      this.getText.checkCart.specialNeeds.push(this.optionalNeeds[event.target.id]);
      this.totalPrice += this.optionalNeeds[event.target.id].value;
    }
  }

  checkInvalidfields(): void {
    const forms = document.getElementsByClassName('needs-validation');
    const validation = Array.prototype.filter.call(forms, function name(form: any) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  parseExpirationDate(): void {
    this.passengerIDInfos.card.expirationYear = this.passengerIDInfos.card.expirationDate.substring(0, 4);
    this.passengerIDInfos.card.expirationMonth = this.passengerIDInfos.card.expirationDate.substring(5, 8);
  }
}
