import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITicket } from './tikerPassengerInfo.interface';

@Component({
  selector: 'jhi-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {

  passengerIDInfos: any[] = [{
    firstName: "",
    lastName: "",
    sex: "",
    date: "",
    phoneNo: "",
    email: ""
  }]

  showInfoForm: boolean = false;
  ticketPrice: number = 100;
  taxesPrice: number = 85.64;
  insurancePrice: number = 7.68;
  discountPromo: number = 5;
  totalPrice: number = this.ticketPrice + this.taxesPrice + this.insurancePrice - this.discountPromo;

  flightInfos: ITicket[] = [{
    flightDate: "29/02/1996",
    departLocation: "London",
    landLocation: "Bucharest",
    stops: 1,
    departTime: "16:30",
    landTime: "18:30"
  }]

  getText: any[] = [{
    "title": 'Fill in the form below',
    "subTitle": 'To​​ comply with the TSA Secure Flight program, the traveler information listed here must exactly match the information on the government - issued photo ID that the traveler presents at the airport.',
    "form": [
      {
        "title": 'Passengers',
      },
      {
        "title": 'Passenger contact information',
        "subTitle": 'Please let us know the best way to reach you during travel, for important flight status updates or notifications. Our team will use this information to contact you with updates about your travel, if necessary.'
      },
      {
        "title": 'Special passenger needs (Optional)',
        "optionsCheckbox": [
          { id: 1, type: 'Blind' },
          { id: 2, type: 'Deaf' },
          { id: 3, type: 'Congnitive disability' },
          { id: 4, type: 'Other disability requiring assistance' },
          { id: 5, type: 'Service animal' }
        ]
      },
      {
        "title": 'Payment',
        "optionsRadio": [
          { id: 1, type: 'Credit card' },
          { id: 2, type: 'Debit card' }
        ]
      }
    ],
    "formID": [{
      "firstName": 'First name',
      "lastName": 'Last name',
      "middleName": 'Middle name',
      "sex": [
        { id: 0, type: 'Sex' },
        { id: 1, type: 'Male' },
        { id: 2, type: 'Female' },
      ],
      "date": 'Date of birth'
    }],
    "formCard": [{
      "name": 'Name on card',
      "number": 'Credit card number',
      "exp": 'Expiration',
      "cvv": 'CVV'
    }],
    "checkCart": [{
      "ticket": 'Ticket (' + 1 + ')',
      "taxes": 'Taxes and fees',
      "discount": 'First time discount',
      "insurance": 'Insurance',
      "total": 'Total',
      "totalSmall": 'Including taxes and fees',
      "departed" : 'Departed'
    }]
  }]

  constructor() { }

  ngOnInit() {
  }

  toggleInfoForm(selectedValue): void {
    this.showInfoForm = selectedValue;
  }

  selectChangedHandler(event : any) {
    this.passengerIDInfos[0].sex = event.target.value; 
  }
}
