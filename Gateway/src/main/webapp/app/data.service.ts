import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TicketModel } from './models/ticket-model';
import { Userinfo, UserinfoService } from './entities/userinfo';
import { Router } from '@angular/router';
import { AccountService, Principal } from './shared';

@Injectable()
export class DataService {

    private myAccount: Account;
    private settingsAccount: any;
    private set = false;

    private ticket = new BehaviorSubject<TicketModel>(new TicketModel());
    public ticketInfo = this.ticket.asObservable();

    private service_user = new BehaviorSubject<Userinfo>(new Userinfo());
    public user = this.service_user.asObservable();

    constructor(
        private router: Router,
        private account: AccountService,
        private userService: UserinfoService,
        private principal: Principal
    ) { }

    updateTicket(newTicket) {
        this.ticket.next(newTicket);
    }

    updateUser(newUser) {
        this.set = true;
        this.service_user.next(newUser);
    }

    resetUser() {
        this.service_user.next(new Userinfo());
        this.set = false;
    }

    resetTicket() {
        this.ticket.next(new TicketModel());
    }

    checkStatus(userinfo) {
        console.log('start to get user');

        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            userinfo.name = this.settingsAccount.lastName;
            userinfo.prenume = this.settingsAccount.firstName;
        });
        this.principal.identity().then((account) => {
            this.myAccount = account;
            this.userService.query().subscribe((data) => {
                this.assignquerydata(data.body, userinfo);
            });
            userinfo.loginid = this.myAccount.id;
        });
    }

    check(userinfo) {
        if (userinfo.id !== undefined) {
            if (userinfo.cnp === null || userinfo.name === null ||
                userinfo.prenume === null || userinfo.dateOfBirth === null ||
                userinfo.adress === null || userinfo.phoneNumber === null ||
                userinfo.idType === null || userinfo.serialNumber === null ||
                userinfo.emittingCountry === null || userinfo.expiringDate === null) {
                this.checkStatus(userinfo);
            } else {
                this.router.navigate(['/flights-page']);
            }
        } else {
            this.checkStatus(userinfo);
        }
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

    assignquerydata(users, userinfo) {
        userinfo.idType = 'Buletin';
        for (const user of users) {
            // tslint:disable-next-line:triple-equals
            if (user.loginid == this.myAccount.id) {
                userinfo = user;

                userinfo.dateOfBirth = {
                    year: userinfo.dateOfBirth.getFullYear(),
                    month: userinfo.dateOfBirth.getMonth() + 1,
                    day: userinfo.dateOfBirth.getDate()
                };
                userinfo.expiringDate = {
                    year: userinfo.expiringDate.getFullYear(),
                    month: userinfo.expiringDate.getMonth() + 1,
                    day: userinfo.expiringDate.getDate()
                };

                this.set = true;
                this.service_user.next(userinfo);
                this.router.navigate(['/flights-page']);
                break;
            }
        }
        this.router.navigate(['/settings']);
    }
}
