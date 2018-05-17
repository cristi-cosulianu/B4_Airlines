import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TicketModel } from '../models/ticket-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'jhi-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: [
    './flights-page.component.css'
  ]
})
export class FlightsPageComponent implements OnInit {
  public ticket = new TicketModel();
  constructor(private data: DataService, private http: HttpClient) {

  }
  ngOnInit() {
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.updateTicket(this.ticket);
    this.http.get('http://localhost:8050/api/flights').subscribe((data) => {
      this.createRowsUsingData(data, 'some');
    });
  }

  sendSubmision() {
    const departure = (<HTMLInputElement>document.getElementById('departure')).value;
    const destination = (<HTMLInputElement>document.getElementById('destination')).value;

    this.http.get('http://localhost:8050/api/flights/' + departure + '/' + destination).subscribe((data) => {
      console.log(data);
      this.removeAllRows();
      this.createRowsUsingData(data, 'all');
    });
  }

  removeAllRows() {
    // Get parent container <tbody>.
    const tableBody = document.getElementById('tableBody');
    // Remove all rows.
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }

  createRowsUsingData(data, howMany) {
    // Get parent container <tbody>.
    const tableBody = document.getElementById('tableBody');

    let size;
    if (howMany === 'some') {
      size = 10;
    } else {
      size = Object.keys(data).length;
    }

    // Iterate through server response.
    for (let iterator = 0; iterator < size; iterator++) {
      // Select one element.
      if (data[iterator] !== undefined) {
        const obj = data[iterator];
        // Create a new row and new columns.
        const row = this.createElement('tr');
        row.setAttribute('class', 'tableRow');
        const flightId = this.createElement('td');
        const departure = this.createElement('td');
        const destination = this.createElement('td');
        const price = this.createElement('td');
        const availableSeats = this.createElement('td');
        const company = this.createElement('td');
        const rating = this.createElement('td');
        const reviews = this.createElement('td');
        // Assign text to simple columns.
        flightId.innerText = obj.id;
        departure.innerText = obj.departure;
        destination.innerText = obj.arrival;
        price.innerText = obj.priceRangeMin;
        availableSeats.innerText = obj.avaibleSeats;
        company.innerText = obj.company;
        // Assign text and $ sign to price column.
        const dolar = this.createElement('span');
        dolar.setAttribute('class', 'price');
        dolar.innerText = '$';
        price.appendChild(dolar);
        // Create div container for raiting stars.
        const ratingDiv = this.createElement('div');
        ratingDiv.setAttribute('class', 'star-rating');
        for (let i = 0; i < 5; i++) {
          // Create stars.
          const span = this.createElement('span');
          // Assign to stras to be yellow or unfilled.
          if (i < obj.rating) {
            span.setAttribute('class', 'fa fa-star');
          } else {
            span.setAttribute('class', 'fa fa-star-o');
          }
          switch (i) {
            case 0: span.setAttribute('data-rating', '1'); break;
            case 1: span.setAttribute('data-rating', '2'); break;
            case 2: span.setAttribute('data-rating', '3'); break;
            case 3: span.setAttribute('data-rating', '4'); break;
            case 4: span.setAttribute('data-rating', '5'); break;
          }
          ratingDiv.appendChild(span);
        }
        rating.appendChild(ratingDiv);
        // Create button for reviews.
        const button = this.createElement('button');
        button.setAttribute('class', 'btn btn-primary btn-sm');
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', '#collapseReview');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', 'collapseReview');
        button.innerText = 'View';
        reviews.appendChild(button);
        // Add all columns to new created row.
        row.appendChild(flightId);
        row.appendChild(departure);
        row.appendChild(destination);
        row.appendChild(price);
        row.appendChild(availableSeats);
        row.appendChild(company);
        row.appendChild(rating);
        row.appendChild(reviews);
        // Add row to table body.
        tableBody.appendChild(row);
      }
    }
  }

  createElement(elementType) {
    // Create new element.
    const element = document.createElement(elementType);
    // I don't know what is that but is needed.
    element.setAttribute('_ngcontent-c0', '');
    return element;
  }
}
