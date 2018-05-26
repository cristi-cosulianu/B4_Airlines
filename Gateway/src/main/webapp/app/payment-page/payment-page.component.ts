import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITicket } from './tikerPassengerInfo.interface';
import { CardService } from '../entities/card/card.service';
import { Card } from '../entities/card/card.model';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

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
      name: '',
      cvv: '',
      cardType: 'Debit card'
    }
  };

  showInfoForm = false;
  ticketPrice = 100;
  taxesPrice = 85.64;
  insurancePrice = 7.68;
  discountPromo = 5;
  totalPrice: number = this.ticketPrice + this.taxesPrice + this.insurancePrice - this.discountPromo;

  flightInfos: ITicket = {
    flightDate: '29/02/1996',
    departLocation: 'London',
    landLocation: 'Bucharest',
    stops: 1,
    departTime: '16:30',
    landTime: '18:30'
  };

  getText: any = {
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
      'taxes': 'Taxes and fees',
      'discount': 'First time discount',
      'insurance': 'Insurance',
      'total': 'Total',
      'totalSmall': 'Including taxes and fees',
      'departed': 'Departed'
    }
  };

  constructor(private cardService: CardService,
    private jhiAlertService: JhiAlertService
  ) { }

  ngOnInit() {
  }

  // submit() {

  //   var date = new Date(2019, 11);
  //   var cardInfo: Card = new Card(1,
  //     this.passengerIDInfos.card.number,
  //     date,
  //     this.passengerIDInfos.card.name,
  //     this.passengerIDInfos.card.cvv,
  //     this.passengerIDInfos.card.cardType
  //   );
  //   this.cardService.create(cardInfo).subscribe(
  //     (res: HttpResponse<Card>) => {
  //       console.log("Functioneaza! " + res.body.id);
  //     },
  //     (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null)
  //   );
  // }

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
    if (index > -1) {
      this.passengerIDInfos.specialNeeds.splice(index, 1);
    } else {
      this.passengerIDInfos.specialNeeds.push(event.target.id);
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
}
