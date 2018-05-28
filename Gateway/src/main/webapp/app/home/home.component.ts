import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal, AccountService } from '../shared';

import * as slider from './slider/slider';
import { DataService } from '../data.service';
import { Userinfo, UserinfoService } from '../entities/userinfo';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css',
        'slider/slider.css',
        'welcome/welcome.css'
    ]
})
export class HomeComponent implements OnInit {

    myAccount: Account;
    modalRef: NgbModalRef;
    userinfo: Userinfo;

    constructor(
        private router: Router,
        private dataService: DataService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.dataService.user.subscribe((_data) => this.userinfo = _data);

        (slider as any).init();

        this.principal.identity().then((account) => {
            this.myAccount = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.myAccount = account;
            });
        });
    }

    engage() {
        if (this.userinfo.cnp === undefined) {
            this.dataService.checkStatus(this.userinfo);
        } else {
            this.router.navigate(['/flights-page']);
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
