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
import { OrderModel } from '../models/order.model';

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
      cardType: 'DEBIT'
    }
  };

  private ticket: TicketModel;
  private flight: Flights = new Flights;
  private user: Userinfo;
  private order: OrderModel;

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
      'ticket': 'Ticket (' + 1 + ')',
      'specialNeeds': Array<number>(),
      'total': 'Total',
      'totalSmall': 'Including taxes and fees',
      'departed': 'Departed'
    }
  };

  constructor(private cardService: CardService,
    private jhiAlertService: JhiAlertService,
    private dataService: DataService,
    private flightsService: FlightsService,
    private finalSagaService: FinalSagaService
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
      // this.totalPrice += 100;
      this.flightInfos.departLocation = this.flight.departure;
      this.flightInfos.departTime = this.flight.departureTime;
      this.flightInfos.landLocation = this.flight.arrival;
      this.flightInfos.landTime = this.flight.arrivalTime;
      this.flightInfos.flightDate = this.flight.company;
    }, () => {
      this.target_popup(0, 'Flight microservice not privided...');
      // this.paymentCompensation();
    });

  }

  submit() {
    this.parseExpirationDate();
    // this.transaction = new Transaction(
    //   this.passengerIDInfos.card.number,
    //   this.passengerIDInfos.card.expirationYear,
    //   this.passengerIDInfos.card.expirationMonth,
    //   this.passengerIDInfos.card.name.toUpperCase(),
    //   this.passengerIDInfos.card.cvv,
    //   this.totalPrice,
    //   false
    // );

    // console.log(this.passengerIDInfos.card.number + ' ' +
    //   this.passengerIDInfos.card.expirationYear + ' ' +
    //   this.passengerIDInfos.card.expirationMonth + ' ' +
    //   this.passengerIDInfos.card.name.toUpperCase() + ' ' +
    //   this.passengerIDInfos.card.cvv + ' ' +
    //   this.totalPrice);

    // if (this.finalSagaService.finaliseTransaction() === true) {
    //   this.updateBank(this.transaction);
    // } else {
    //   this.target_popup(404, 'Finalise transaction service won\'t respond...');
    // }
    this.ticket.ticket_price = this.totalPrice;
    this.dataService.updateTicket(this.ticket);
    this.order = new OrderModel();
    this.order.cardCCV = this.passengerIDInfos.card.ccv;
    this.order.cardExpirationMonth = this.passengerIDInfos.card.expirationMonth;
    this.order.cardExpirationYear = this.passengerIDInfos.card.expirationYear;
    this.order.cardNumber = this.passengerIDInfos.card.number;
    this.order.cardOwnerName = this.passengerIDInfos.card.name.toUpperCase();
    this.order.cardType = this.passengerIDInfos.card.cardType;
    this.order.specialNeeds = this.passengerIDInfos.specialNeeds;
    this.dataService.updateOrder(this.order);
    this.finalSagaService.paymentResult.subscribe((messageRsp) => {
      this.target_popup(messageRsp.status, messageRsp.message);
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
}
