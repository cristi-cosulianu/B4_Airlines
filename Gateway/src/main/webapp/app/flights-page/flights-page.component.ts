import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TicketModel } from '../models/ticket-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flights, FlightsService } from '../entities/flights';
import { Review, ReviewService } from '../entities/review';
import { RatingService, Rating } from '../entities/rating';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Userinfo, UserinfoService } from '../entities/userinfo';

@Component({
  selector: 'jhi-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: [
    './flights-page.component.css'
  ],
  providers: [NgbRatingConfig]
})
export class FlightsPageComponent implements OnInit {

  currentRate = 3;
  hovered = 0;
  userInfo: Userinfo;

  public ticket = new TicketModel();
  constructor(private data: DataService,
    private router: Router,
    private flightsService: FlightsService,
    private reviewsService: ReviewService,
    private ratingService: RatingService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = false;
  }
  ngOnInit() {
    // for (let i = 2701; i <= 2753; i++) {
    //   this.ratingService.delete(i).subscribe((_data) => {});
    // }
    // this.ratingService.ratingForUserAndFlight(951, 975).subscribe((data) => {
    //   console.log(data);
    // },
    // (err) => {
    //   console.log(err);
    // });
    this.data.ticketInfo.subscribe((_data) => this.ticket = _data);
    this.data.user.subscribe((_data) => this.userInfo = _data);
    this.data.updateTicket(this.ticket);
    this.flightsService.query().subscribe((_data) => {
      this.removeAllRows();
      this.createRowsUsingData(_data.body, 'some');
    });
  }

  calculateRate() {
    this.currentRate = ((this.currentRate + this.hovered) / 2);
  }

  sendSubmision() {
    const departureCity = (<HTMLInputElement>document.getElementById('departure')).value;
    const destinationCity = (<HTMLInputElement>document.getElementById('destination')).value;
    this.flightsService.submit(departureCity, destinationCity).subscribe((data) => {
      this.removeAllRows();
      this.createRowsUsingData(data.body, 'all');
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
        const planeType = this.createElement('td');
        const company = this.createElement('td');
        const rating = this.createElement('td');
        const reviews = this.createElement('td');
        const select = this.createElement('td');
        // Assign text to simple columns.
        flightId.innerText = obj.id;
        departure.innerText = obj.departure + ' ' + obj.departureTime;
        destination.innerText = obj.arrival + ' ' + obj.arrivalTime;
        price.innerText = obj.priceRangeMin + '-' + obj.priceRangeMax;
        planeType.innerText = obj.planeType;
        company.innerText = obj.company;
        // Assign text and $ sign to price column.
        const dolar = this.createElement('span');
        dolar.setAttribute('class', 'price');
        dolar.innerText = '$';
        price.appendChild(dolar);
        // Create div container for raiting stars.
        const ratingDiv = this.createElement('div');
        ratingDiv.setAttribute('class', 'star-rating');
        ratingDiv.addEventListener('mouseleave', (event) => this.displayRating(obj.id, iterator) );
        this.ratingService.ratingForFlight(obj.id).subscribe((response) => {
          for (let i = 0; i < 5; i++) {
            // Create stars.
            const span = this.createElement('span');
            span.setAttribute('id', 'row' + iterator + 'star' + i );
            // Assign stars to be yellow or unfilled.
            if (i < response.body) {
              span.setAttribute('class', 'fa fa-star');
            } else {
              span.setAttribute('class', 'fa fa-star-o');
            }
            const ratingNumber = i.toString();
            span.setAttribute('data-rating', ratingNumber);
            span.addEventListener('mouseenter', (event) => this.changeStarInYellow(i, iterator) );
            span.addEventListener('mouseleave', (event) => this.changeStarInUnfilled(i, iterator) );
            span.addEventListener('click', (event) => this.submitRating(obj.id, iterator, i) );
            ratingDiv.appendChild(span);
          }
          rating.appendChild(ratingDiv);
          // Create button for reviews.
          const reviewButton = this.createElement('button');
          reviewButton.setAttribute('type', 'button');
          reviewButton.setAttribute('id', 'reviewButton' + iterator);
          reviewButton.setAttribute('class', 'btn btn-outline-primary btn-sm btn-review');
          reviewButton.setAttribute('aria-expanded', '!isCollapsed1');
          reviewButton.setAttribute('aria-controls', 'review1');
          reviewButton.addEventListener('click', (event) => this.displayFlightReviews(obj.id, iterator));
          reviewButton.innerText = 'Show';
          reviews.appendChild(reviewButton);
          // Create select flight button.
          const selectButton = this.createElement('button');
          selectButton.setAttribute('class', 'btn btn-primary btn-sm');
          selectButton.setAttribute('type', 'submit');
          selectButton.addEventListener('click', (event) => this.populateTicket(obj.id, obj.departure, obj.arrival, obj.planeType));
          selectButton.innerText = 'Select';
          select.appendChild(selectButton);
          // Add all columns to new created row.
          row.appendChild(flightId);
          row.appendChild(departure);
          row.appendChild(destination);
          row.appendChild(price);
          row.appendChild(company);
          row.appendChild(planeType);
          row.appendChild(rating);
          row.appendChild(reviews);
          row.appendChild(select);
          // Add row to table body.
        });
        tableBody.appendChild(row);
      }
    }
  }

  displayFlightReviews(flightId, rowNum) {
    const tableBody = document.getElementById('tableBody');
    const reviewRow = this.createElement('tr');
    reviewRow.setAttribute('id', 'reviewList' + rowNum);
    reviewRow.setAttribute('class', 'collapse-review');
    const reviewColumn = this.createElement('td');
    reviewColumn.setAttribute('colspan', '9');
    const flights = document.getElementsByClassName('tableRow');
    this.reviewsService.reviewsForFlight(flightId).subscribe((data) => {
      const size = Object.keys(data.body).length;
      for (let iterator = 0; iterator < size; iterator++) {
        if (data.body[iterator] !== undefined) {
          const obj = data.body[iterator];
          const review = this.createElement('div');
          review.innerText = obj.description;
          reviewColumn.appendChild(review);
        }
      }
      if (flights.length > rowNum + 1) {
        tableBody.insertBefore(reviewRow, flights[rowNum + 1]);
      } else {
        tableBody.appendChild(reviewRow);
      }
      const reviewInput = this.createElement('textarea');
      reviewInput.setAttribute('id', 'textarea' + rowNum);
      reviewInput.setAttribute('type', 'text');
      reviewInput.setAttribute('class', 'form-control reviewInput');
      reviewColumn.appendChild(reviewInput);
      const submitReview = this.createElement('button');
      submitReview.setAttribute('class', 'btn btn-primary btn-sm');
      submitReview.setAttribute('type', 'submit');
      submitReview.addEventListener('click', (event) => this.submitReview(flightId, rowNum));
      submitReview.innerText = 'Submit';
      reviewColumn.appendChild(submitReview);
      reviewRow.appendChild(reviewColumn);
      this.recreateNode(document.getElementById('reviewButton' + rowNum), false);
      const reviewButton = document.getElementById('reviewButton' + rowNum);
      reviewButton.innerText = 'Hide';
      reviewButton.addEventListener('click', (event) => this.removeFlightReviews(flightId, rowNum));
    });
  }

  removeFlightReviews(flightId, rowNum) {
    const tableBody = document.getElementById('tableBody');
    const reviewList = document.getElementById('reviewList' + rowNum);
    tableBody.removeChild(reviewList);
    const flights = document.getElementsByClassName('tableRow');
    this.recreateNode(document.getElementById('reviewButton' + rowNum), false);
    const reviewButton = document.getElementById('reviewButton' + rowNum);
    reviewButton.innerText = 'Show';
    reviewButton.addEventListener('click', (event) => this.displayFlightReviews(flightId, rowNum));
  }

  submitReview(flightIdParameter, rowNum) {
      const textArea = (document.getElementById('textarea' + rowNum) as HTMLTextAreaElement);
      const textAreaReview = textArea.value;
      if (textAreaReview.length > 20) {
        if (this.userInfo.id !== undefined) {
          const review: Review = {flightId: flightIdParameter, description: textAreaReview, userId: this.userInfo.id};
          this.reviewsService.create(review).subscribe((data) => {
            this.removeFlightReviews(flightIdParameter, rowNum);
          });
        }
      }

  }

  recreateNode(el, withChildren) {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    } else {
      const newEl = el.cloneNode(false);
      while (el.hasChildNodes()) {
        newEl.appendChild(el.firstChild);
      }
      el.parentNode.replaceChild(newEl, el);
    }
  }

  populateTicket(flightId, departure, destination, planeType) {
    this.ticket.ticket_flightID = flightId;
    this.ticket.ticket_planeType = planeType;
    this.ticket.ticket_departure = departure;
    this.ticket.ticket_destination = destination;
    this.ticket.ticket_userID = '' + this.userInfo.id;
    this.data.updateTicket(this.ticket);
    this.router.navigate([`./seats-configure-page`]);
  }

  createElement(elementType) {
    // Create new element.
    const element = document.createElement(elementType);
    // I don't know what is that but is needed.
    element.setAttribute('_ngcontent-c0', '');
    return element;
  }

  changeStarInYellow(starNumber, rowNum) {
    for (let iterator = 0; iterator <= starNumber; iterator++) {
      const star = document.getElementById('row' + rowNum + 'star' + iterator );
      star.setAttribute('class', 'fa fa-star');
    }
  }

  changeStarInUnfilled(starNumber, rowNum) {
    for (let iterator = starNumber + 1; iterator < 5; iterator++) {
      const star = document.getElementById('row' + rowNum + 'star' + iterator );
      star.setAttribute('class', 'fa fa-star-o');
    }
  }

  displayRating(flightId, rowNum) {
    this.ratingService.ratingForFlight(flightId).subscribe((data) => {
      for (let i = 0; i < 5; i++) {
        const star = document.getElementById('row' + rowNum + 'star' + i);
        if (i < data.body) {
          star.setAttribute('class', 'fa fa-star');
        } else {
          star.setAttribute('class', 'fa fa-star-o');
        }
      }
    });
  }

  submitRating(flightIdParameter, rowNum, starNumber) {
    const rating: Rating = {userId: this.userInfo.id, flightId: flightIdParameter, rating: starNumber + 1};
    if (this.userInfo.id !== undefined) {
      this.ratingService.ratingForUserAndFlight(flightIdParameter, this.userInfo.id).subscribe((data) => {}, (err) => {
          this.ratingService.create(rating).subscribe((_data) => {});
      });
    }
  }
}
