import { Component, OnInit } from '@angular/core';

import { Principal, AccountService } from '../../shared';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.css' ]
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    settingsOption: string;

    constructor(
        private account: AccountService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.settingsOption = 'Account';
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
    }
}
