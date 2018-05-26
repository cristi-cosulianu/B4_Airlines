import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Bank e2e test', () => {

    let navBarPage: NavBarPage;
    let bankDialogPage: BankDialogPage;
    let bankComponentsPage: BankComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Banks', () => {
        navBarPage.goToEntity('bank');
        bankComponentsPage = new BankComponentsPage();
        expect(bankComponentsPage.getTitle())
            .toMatch(/Banks/);

    });

    it('should load create Bank dialog', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage = new BankDialogPage();
        expect(bankDialogPage.getModalTitle())
            .toMatch(/Create or edit a Bank/);
        bankDialogPage.close();
    });

    it('should create and save Banks', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage.setNumberInput('number');
        expect(bankDialogPage.getNumberInput()).toMatch('number');
        bankDialogPage.setExpirationYearInput('5');
        expect(bankDialogPage.getExpirationYearInput()).toMatch('5');
        bankDialogPage.setExpirationMonthInput('5');
        expect(bankDialogPage.getExpirationMonthInput()).toMatch('5');
        bankDialogPage.setNameInput('name');
        expect(bankDialogPage.getNameInput()).toMatch('name');
        bankDialogPage.setCcvInput('ccv');
        expect(bankDialogPage.getCcvInput()).toMatch('ccv');
        bankDialogPage.setCurrencyInput('currency');
        expect(bankDialogPage.getCurrencyInput()).toMatch('currency');
        bankDialogPage.setAmountInput('5');
        expect(bankDialogPage.getAmountInput()).toMatch('5');
        bankDialogPage.getExpiredInput().isSelected().then((selected) => {
            if (selected) {
                bankDialogPage.getExpiredInput().click();
                expect(bankDialogPage.getExpiredInput().isSelected()).toBeFalsy();
            } else {
                bankDialogPage.getExpiredInput().click();
                expect(bankDialogPage.getExpiredInput().isSelected()).toBeTruthy();
            }
        });
        bankDialogPage.save();
        expect(bankDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BankComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bank div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BankDialogPage {
    modalTitle = element(by.css('h4#myBankLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numberInput = element(by.css('input#field_number'));
    expirationYearInput = element(by.css('input#field_expirationYear'));
    expirationMonthInput = element(by.css('input#field_expirationMonth'));
    nameInput = element(by.css('input#field_name'));
    ccvInput = element(by.css('input#field_ccv'));
    currencyInput = element(by.css('input#field_currency'));
    amountInput = element(by.css('input#field_amount'));
    expiredInput = element(by.css('input#field_expired'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumberInput = function(number) {
        this.numberInput.sendKeys(number);
    };

    getNumberInput = function() {
        return this.numberInput.getAttribute('value');
    };

    setExpirationYearInput = function(expirationYear) {
        this.expirationYearInput.sendKeys(expirationYear);
    };

    getExpirationYearInput = function() {
        return this.expirationYearInput.getAttribute('value');
    };

    setExpirationMonthInput = function(expirationMonth) {
        this.expirationMonthInput.sendKeys(expirationMonth);
    };

    getExpirationMonthInput = function() {
        return this.expirationMonthInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCcvInput = function(ccv) {
        this.ccvInput.sendKeys(ccv);
    };

    getCcvInput = function() {
        return this.ccvInput.getAttribute('value');
    };

    setCurrencyInput = function(currency) {
        this.currencyInput.sendKeys(currency);
    };

    getCurrencyInput = function() {
        return this.currencyInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    getExpiredInput = function() {
        return this.expiredInput;
    };
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
