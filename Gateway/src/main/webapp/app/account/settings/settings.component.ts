import { Component, OnInit } from '@angular/core';

import { Principal, AccountService, User } from '../../shared';
import { Userinfo, UserinfoService } from '../../entities/userinfo';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';
import { Review, ReviewService } from '../../entities/review';
import { DataService } from '../../data.service';

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
    reviews: Review[];
    settingsAccount: any;
    userinfo: Userinfo;
    myAccount: Account;

    constructor(
        private dataService: DataService,
        private account: AccountService,
        private userService: UserinfoService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private reviewService: ReviewService
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
        this.settingsOption = option;
        if (option === 'Reviews') {
            this.reviewService.query(`userid=aa1111111111111111`).subscribe(
                (res: HttpResponse<Review[]>) => { this.reviews = res.body; });
        }
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
        } else {
            this.subscribeToSaveResponse(
                this.userService.create(this.userinfo));
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
