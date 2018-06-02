import { Component, OnInit } from '@angular/core';

import { Principal, AccountService, User } from '../../shared';
import { Userinfo, UserinfoService } from '../../entities/userinfo';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';
import { Review, ReviewService } from '../../entities/review';
import { DataService } from '../../data.service';
import { SettingsReview } from './models/review.model';
import { FlightsService, EntityResponseType, Flights } from '../../entities/flights';
import { Ticket } from './models/ticket.model';
import { OrderHistoryService, OrderHistory } from '../../entities/order-history';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {

    error: string;
    success: string;
    languages: any[];
    settingsOption: string;
    reviews: SettingsReview[];
    settingsAccount: any;
    userinfo: Userinfo;
    myAccount: Account;
    ticketHistory: Ticket[];

    constructor(
        private dataService: DataService,
        private account: AccountService,
        private userService: UserinfoService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private reviewService: ReviewService,
        private flightsService: FlightsService,
        private historyService: OrderHistoryService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.dataService.user.subscribe((_data) => this.userinfo = _data);
        this.dataService.updateUser(this.userinfo);

        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.userinfo.name = this.settingsAccount.lastName;
            this.userinfo.prenume = this.settingsAccount.firstName;
        });
        this.principal.identity().then((account) => {
            this.myAccount = account;
            this.userService.query().subscribe((data) => {
                this.assignquerydata(data.body);
            });

            this.userinfo.loginid = this.myAccount.id;
        });
        this.settingsOption = 'Account';
        // this.setActivePage();
    }

    assignquerydata(users) {
        this.userinfo.idType = 'Buletin';
        for (const user of users) {
            // tslint:disable-next-line:triple-equals
            if (user.loginid == this.myAccount.id) {
                this.userinfo = user;

                this.userinfo.dateOfBirth = {
                    year: this.userinfo.dateOfBirth.getFullYear(),
                    month: this.userinfo.dateOfBirth.getMonth() + 1,
                    day: this.userinfo.dateOfBirth.getDate()
                };
                this.userinfo.expiringDate = {
                    year: this.userinfo.expiringDate.getFullYear(),
                    month: this.userinfo.expiringDate.getMonth() + 1,
                    day: this.userinfo.expiringDate.getDate()
                };
                this.dataService.updateUser(this.userinfo);
                break;
            }
        }
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
        this.dataService.updateUser(this.userinfo);
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    getSettingsOption() {
        return this.settingsOption;
    }

    setSettingsOption(option: string) {
        this.resetActivePage(option);
        this.settingsOption = option;
        if (option === 'Reviews') {
            this.initReviews();
        } else if (option === 'History') {
            this.initHistory();
        }
    }

    resetActivePage(id: string) {
        const allelements = document.getElementsByClassName('option-item');
        for (let i = 0; i < allelements.length; i++) {
            allelements[i].className = allelements[i].className.replace(' active', '');
        }
        const btnContainer = document.getElementById(id);
        btnContainer.className += ' active';
    }

    initReviews() {
        this.reviews = [];
        this.reviewService.reviewsForUser(this.userinfo.id).subscribe(
            (res: HttpResponse<Review[]>) => {
                console.log(res);
                for (const rev of res.body) {
                        const review = new SettingsReview();
                        review.id = rev.id;
                        review.flightId = rev.flightId;
                        review.description = rev.description;
                        this.flightsService.find(rev.flightId).subscribe(
                            (response: EntityResponseType) => {
                                const flight = response.body;
                                review.company = flight.company;
                                review.departure = flight.departure;
                                review.arrival = flight.arrival;
                                review.rating = flight.rating;
                            });
                        this.reviews.push(review);
                }
            }
        );
    }

    initHistory() {
        this.ticketHistory = [];
        this.historyService.query().subscribe(
            (res: HttpResponse<OrderHistory[]>) => {
                for (const order of res.body) {
                    if (this.userinfo.id === +order.ticketUserId) {
                        const ticket = new Ticket();
                        ticket.price = order.ticketPrice;
                        this.flightsService.find(order.ticketFlightID).subscribe(
                            (flight: EntityResponseType) => {
                                const flightInfo = flight.body;
                                ticket.arrival = flightInfo.arrival;
                                ticket.arrivalTime = flightInfo.arrivalTime;
                                ticket.departure = flightInfo.departure;
                                ticket.departureTime = flightInfo.departureTime;
                            });
                        this.ticketHistory.push(ticket);
                    }
                }
            }
        );
    }

    range(count): number[] {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(1);
        }
        return list;
    }

    builduserid() {
        let res = 'US';
        let date = this.userinfo.dateOfBirth.day;
        if (parseInt(date, 10) < 10) {
            res = res + '0' + date;
        } else {
            res = res + date;
        }
        date = this.userinfo.dateOfBirth.month;
        if (parseInt(date, 10) < 10) {
            res = res + '0' + date;
        } else {
            res = res + date;
        }
        res = res + 'CN' + this.userinfo.cnp.substr(7, 6);
        res = res + 'INFO';
        this.userinfo.uid = res;
    }

    personalSave() {
        this.builduserid();

        if (this.userinfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userService.update(this.userinfo));
                alert('succes');
        } else {
            this.subscribeToSaveResponse(
                this.userService.create(this.userinfo));
                alert('succes');
                this.router.navigate(['']);
        }
        this.dataService.updateUser(this.userinfo);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Userinfo>>) {
        result.subscribe((res: HttpResponse<Userinfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Userinfo) {
        this.eventManager.broadcast({ name: 'userinfoListModification', content: 'OK' });
    }

    onSaveError() {
        console.log('save error');
    }
}
