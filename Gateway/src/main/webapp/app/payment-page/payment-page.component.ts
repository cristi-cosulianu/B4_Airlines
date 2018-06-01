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
import { FinalSagaService } from '../final-saga.service';
import { AccountService, Principal } from '../shared';
import { SettingsComponent } from '../account/settings/settings.component';

@Component({
  selector: 'jhi-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {

  [x: string]: any;
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
      cardType: 'DEBIT'
    }
  };

  private ticket;
  private flight: Flights = new Flights;
  private user: Userinfo;
  private order: OrderHistory;
  private accountInfo: any;
  private bank: Bank;
  private card: Card;
  private transaction: Transaction;
  currentDate = new Date();
  currentDateMonth = this.currentDate.getMonth() + 1;
  showInfoForm = false;
  private ticketPrice: number;
  private totalPrice = 0;
  optionalNeeds: any = [
    { name: 'Blind', value: 10.07 },
    { name: 'Deaf', value: 20.14 },
    { name: 'Congnitive disability', value: 25.17 },
    { name: 'Other disability', value: 0 },
    { name: 'Service animal', value: 12.58 }
  ];

  flightInfos: ITicket = {
    flightCompany: 'Wizz',
    departLocation: 'London',
    landLocation: 'Bucharest',
    quantity: 0,
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
          'CREDIT',
          'DEBIT'
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
      'ticket': 'Ticket',
      'specialNeeds': Array<number>(),
      'total': 'Total',
      'totalSmall': 'Free taxes and fees',
      'departed': 'Departed'
    }
  };

  constructor(private cardService: CardService,
    private jhiAlertService: JhiAlertService,
    private bankService: BankService,
    private dataService: DataService,
    private flightsService: FlightsService,
    private orderHistoryService: OrderHistoryService,
    private finalSagaService: FinalSagaService,
    private account: AccountService,
    private principal: Principal
  ) { }

  // Recomandat de facut initializarile aici
  ngOnInit() {
    // Raman de luat locurile si tipul avionului din ticket
    this.dataService.ticketInfo.subscribe((ticket: TicketModel) => {
      this.ticket = ticket;
    }, () => {
      this.target_popup(0, 'Ticket not provided...');
      // this.paymentCompensation();
    });

    this.flightsService.find(this.ticket.ticket_flightID).subscribe((data) => {
      this.flight = data.body;
      this.dataService.user.subscribe((_data) => this.user);
      this.ticketPrice = this.flight.priceRangeMax;
      this.totalPrice = this.ticketPrice * this.ticket.ticket_seats.length;
      this.flightInfos.departLocation = this.flight.departure;
      this.flightInfos.departTime = this.flight.departureTime;
      this.flightInfos.landLocation = this.flight.arrival;
      this.flightInfos.landTime = this.flight.arrivalTime;
      this.flightInfos.flightCompany = this.flight.company;
    }, () => {
      this.target_popup(0, 'Flight microservice not privided...');
      // this.paymentCompensation();
    });

    this.dataService.user.subscribe((_data) => {
      this.user = _data;
      if (this.user.phoneNumber !== undefined) {
        this.passengerIDInfos.phoneNo = this.user.phoneNumber;
        this.passengerIDInfos.firstName = this.user.name;
        this.passengerIDInfos.lastName = this.user.prenume;
      }
    });

    if (this.ticket.ticket_seats !== undefined) {
      this.flightInfos.quantity = this.ticket.ticket_seats.length;
    }
  }

  submit() {
    this.parseExpirationDate();
    this.transaction = new Transaction(
      this.passengerIDInfos.card.number,
      this.passengerIDInfos.card.expirationYear,
      this.passengerIDInfos.card.expirationMonth,
      this.passengerIDInfos.card.name.toUpperCase(),
      this.passengerIDInfos.card.cvv,
      this.totalPrice,
      false
    );

    console.log(this.passengerIDInfos.card.number + ' ' +
      this.passengerIDInfos.card.expirationYear + ' ' +
      this.passengerIDInfos.card.expirationMonth + ' ' +
      this.passengerIDInfos.card.name.toUpperCase() + ' ' +
      this.passengerIDInfos.card.cvv + ' ' +
      this.totalPrice);

    this.updateBank(this.transaction);
  }

  updateBank(transaction: Transaction): void {
    this.bankService.updateBankAmount(transaction).subscribe(
      (res: HttpResponse<Bank>) => {
        console.log('Updated succesfully! ' + res.body.id + res.body.amount);
        this.card = new Card(
          null,
          this.passengerIDInfos.card.number,
          this.passengerIDInfos.card.expirationMonth,
          this.passengerIDInfos.card.expirationYear,
          this.passengerIDInfos.card.name,
          this.passengerIDInfos.card.cvv,
          this.passengerIDInfos.card.cardType
        );
        this.updateCard(this.card);
      },
      (res: HttpErrorResponse) => {
        // rollback
        if (res.status === 304) {
          this.target_popup(404, 'Insuficient funds!');
        } else if (res.status === 404) {
          this.target_popup(404, 'Card not found!');
        } else {
          this.target_popup(404, 'Update transaction error ' + res.status);
        }
        this.paymentCompensation();
        this.jhiAlertService.error(res.message, null, null);
      }
    );
  }

  updateCard(card: Card): void {
    this.cardService.update(card).subscribe(
      (res: HttpResponse<Card>) => {
        console.log('Card updated succesfully! ' + res.body.id);
        this.card = res.body;
        let i = 0;
        this.order = new OrderHistory(
          null,
          this.ticket.ticket_userID,
          this.ticket.ticket_flightID,
          this.ticket.ticket_planeType,
          this.totalPrice,
          this.passengerIDInfos.specialNeeds.indexOf(i++) !== -1,
          this.passengerIDInfos.specialNeeds.indexOf(i++) !== -1,
          this.passengerIDInfos.specialNeeds.indexOf(i++) !== -1,
          this.passengerIDInfos.specialNeeds.indexOf(i++) !== -1,
          this.passengerIDInfos.specialNeeds.indexOf(i++) !== -1,
          this.card.id
        );
        this.updateOrderHistory(this.order);
      },
      (res: HttpErrorResponse) => {
        this.target_popup(404, 'Card error ' + res.status);
        // rollback
        this.paymentCompensation(this.transaction);
        this.jhiAlertService.error(res.message, null, null);
      }
    );
  }

  updateOrderHistory(order: OrderHistory): void {
    this.orderHistoryService.update(order).subscribe(
      (res: HttpResponse<OrderHistory>) => {
        this.order = res.body;

        this.finalSagaService.transactionResponse.subscribe((rsp: boolean) => {
          if (rsp.valueOf() === true) {
            console.log('Order updated succesfully! ' + res.body.id);
            this.showInvoice();
            // this.target_popup(200, 'Succesful transaction !');
          } else if (rsp.valueOf() === false) {
            this.target_popup(404, 'Seats are already taken! ');
            this.paymentCompensation(this.transaction, this.card, this.order);
          }
        });
        this.finalSagaService.finaliseTransaction();
      },
      (res: HttpErrorResponse) => {
        this.target_popup(404, 'OrderHistory error ' + res.status);
        // rollback
        this.paymentCompensation(this.transaction, this.card);
        this.jhiAlertService.error(res.message, null, null);
      }
    );
  }

  private paymentCompensation(transaction?: Transaction, card?: Card, history?: OrderHistory) {
    // Work in progress
    let message = 'Rollback \n';
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

  editFormvalid(): void {
    this.checkInvalidfields();
    const getFormId = document.getElementById('passangerInfoForm');
    if (this.hasClass(getFormId, 'ng-valid') === true) {
      this.submit();
    }
  }

  hasClass(element, className) {
    return element.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className);
  }

  target_popup(errorCode: number, message: string): void {
    const popupDiv = document.getElementById('feedMess') as HTMLElement;
    const innerDiv = document.createElement('div') as HTMLElement;
    const mTitle = document.createElement('strong') as HTMLElement;
    const desc = document.createElement('p') as HTMLElement;
    switch (errorCode) {
      case 404:
        innerDiv.classList.add('alert');
        innerDiv.classList.add('alert-danger');
        innerDiv.setAttribute('role', 'alert');
        mTitle.innerHTML = 'Oh snap!';
        mTitle.style.fontWeight = 'bold';
        mTitle.style.cssFloat = 'left';
        mTitle.style.paddingRight = '10px';
        desc.innerHTML = message;
        desc.style.marginBottom = '0';
        innerDiv.appendChild(mTitle);
        innerDiv.appendChild(desc);
        popupDiv.appendChild(innerDiv);
        break;
      case 200:
        innerDiv.classList.add('alert');
        innerDiv.classList.add('alert-success');
        innerDiv.setAttribute('role', 'alert');
        mTitle.innerHTML = 'Well done!';
        mTitle.style.fontWeight = 'bold';
        mTitle.style.cssFloat = 'left';
        mTitle.style.paddingRight = '10px';
        desc.innerHTML = message;
        desc.style.marginBottom = '0';
        innerDiv.appendChild(mTitle);
        innerDiv.appendChild(desc);
        popupDiv.appendChild(innerDiv);
        break;
      default:
        innerDiv.classList.add('alert');
        innerDiv.classList.add('alert-dark');
        innerDiv.setAttribute('role', 'alert');
        mTitle.innerHTML = 'Sorry !';
        mTitle.style.fontWeight = 'bold';
        mTitle.style.cssFloat = 'left';
        mTitle.style.paddingRight = '10px';
        desc.innerHTML = message + '   Please try again later.';
        desc.style.marginBottom = '0';
        innerDiv.appendChild(mTitle);
        innerDiv.appendChild(desc);
        popupDiv.appendChild(innerDiv);
        break;
    }
  }

  removeFeedMess() {
    const displayResults = document.getElementById('feedMess') as HTMLDivElement;
    while (displayResults.hasChildNodes()) {
      displayResults.removeChild(displayResults.lastChild);
    }
  }

  forceInputUppercase(inputText) {
    const start = inputText.target.selectionStart;
    const end = inputText.target.selectionEnd;
    inputText.target.value = inputText.target.value.toUpperCase();
    inputText.target.setSelectionRange(start, end);
  }

  showInvoice() {
    const pay = document.getElementById('paymentForm');
    const inv = document.getElementById('invoicePayment');
    if (pay.style.display === 'none') {
      pay.style.display = 'block';
    } else {
      pay.style.display = 'none';
    }
    if (inv.style.display === 'block') {
      inv.style.display = 'none';
    } else {
      inv.style.display = 'block';
    }
  }
}
