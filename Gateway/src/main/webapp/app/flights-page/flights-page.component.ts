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
    this.http.get('http://localhost:8050/flights').subscribe((data) => {
      console.log(data);
    });
  }

  sendSubmision() {
    const departure = (<HTMLInputElement>document.getElementById('departure')).value;
    const destination = (<HTMLInputElement>document.getElementById('destination')).value;
    this.http.get('http://localhost:8050/flights/' + departure + '/' + destination).subscribe((data) => {
      this.removeAllRows();
      this.createRowsUsingData(data);
    });
  }

  removeAllRows(){
    // Get parent container <tbody>.
    const tableBody = document.getElementById('tableBody');

    // Get all rows.
    const rows = document.getElementsByClassName('tableRow');
    for(let iterator = 0;iterator < rows.length; iterator++){
      // Remove row by row.
      tableBody.removeChild(rows[iterator]);
    }
  }

  createRowsUsingData(data){
    // Get parent container <tbody>.
    const tableBody = document.getElementById('tableBody');

      // Iterate through server response.
      for (let iterator = 0;iterator < Object.keys(data).length; iterator++){
        // Select one element.
        const obj = data[iterator];

        // Create a new row and new columns.
        let row = this.createElement('tr');
        row.setAttribute('class','tableRow');
        let flightId = this.createElement('td');
        let departure = this.createElement('td');
        let destination = this.createElement('td');
        let price = this.createElement('td');
        let availableSeats = this.createElement('td');
        let company = this.createElement('td');
        let rating = this.createElement('td');
        let reviews = this.createElement('td');

        // Assign text to simple columns.
        flightId.innerText = obj.id;
        departure.innerText = obj.departure;
        destination.innerText = obj.arrival;
        price.innerText = obj.priceRangeMin;
        availableSeats.innerText = obj.avaibleSeats;
        company.innerText = obj.company;

        // Assign text and $ sign to price column.
        let span = this.createElement('span');
        span.setAttribute('class','price');
        span.innerText = '$';
        price.appendChild(span);

        // Create div container for raiting stars.
        let ratingDiv = this.createElement('div');
        ratingDiv.setAttribute('class','star-rating');
        for(let i=0;i<5;i++) {
          // Create stars.
          let span = this.createElement('span');

          // Assign to stras to be yellow or unfilled.
          if(i<obj.rating) { span.setAttribute('class','fa fa-star'); }
          else { span.setAttribute('class','fa fa-star-o'); }

          switch (i){
            case 0: span.setAttribute('data-rating','1'); break;
            case 1: span.setAttribute('data-rating','2'); break;
            case 2: span.setAttribute('data-rating','3'); break;
            case 3: span.setAttribute('data-rating','4'); break;
            case 4: span.setAttribute('data-rating','5'); break;
          }
          ratingDiv.appendChild(span);
        }
        rating.appendChild(ratingDiv);

        // Create button for reviews.
        let button = this.createElement('button');
        button.setAttribute('class','btn btn-primary btn-sm');
        button.setAttribute('type','button');
        button.setAttribute('data-toggle','collapse');
        button.setAttribute('data-target','#collapseReview');
        button.setAttribute('aria-expanded','false');
        button.setAttribute('aria-controls','collapseReview');
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

  createElement(elementType){
    // Create new element.
    let element = document.createElement(elementType);
    // I don't know what is that but is needed.
    element.setAttribute('_ngcontent-c0','');
    return element;
  }
}
