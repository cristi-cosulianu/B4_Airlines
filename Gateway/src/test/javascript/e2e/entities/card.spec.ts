import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Card e2e test', () => {

    let navBarPage: NavBarPage;
    let cardDialogPage: CardDialogPage;
    let cardComponentsPage: CardComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cards', () => {
        navBarPage.goToEntity('card');
        cardComponentsPage = new CardComponentsPage();
        expect(cardComponentsPage.getTitle())
            .toMatch(/Cards/);

    });

    it('should load create Card dialog', () => {
        cardComponentsPage.clickOnCreateButton();
        cardDialogPage = new CardDialogPage();
        expect(cardDialogPage.getModalTitle())
            .toMatch(/Create or edit a Card/);
        cardDialogPage.close();
    });

    it('should create and save Cards', () => {
        cardComponentsPage.clickOnCreateButton();
        cardDialogPage.setNumberInput('number');
        expect(cardDialogPage.getNumberInput()).toMatch('number');
        cardDialogPage.setExpirationDateInput('2000-12-31');
        expect(cardDialogPage.getExpirationDateInput()).toMatch('2000-12-31');
        cardDialogPage.setNameInput('name');
        expect(cardDialogPage.getNameInput()).toMatch('name');
        cardDialogPage.setCcvInput('ccv');
        expect(cardDialogPage.getCcvInput()).toMatch('ccv');
        cardDialogPage.cardTypeSelectLastOption();
        cardDialogPage.save();
        expect(cardDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CardComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-card div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CardDialogPage {
    modalTitle = element(by.css('h4#myCardLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numberInput = element(by.css('input#field_number'));
    expirationDateInput = element(by.css('input#field_expirationDate'));
    nameInput = element(by.css('input#field_name'));
    ccvInput = element(by.css('input#field_ccv'));
    cardTypeSelect = element(by.css('select#field_cardType'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumberInput = function(number) {
        this.numberInput.sendKeys(number);
    };

    getNumberInput = function() {
        return this.numberInput.getAttribute('value');
    };

    setExpirationDateInput = function(expirationDate) {
        this.expirationDateInput.sendKeys(expirationDate);
    };

    getExpirationDateInput = function() {
        return this.expirationDateInput.getAttribute('value');
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

    setCardTypeSelect = function(cardType) {
        this.cardTypeSelect.sendKeys(cardType);
    };

    getCardTypeSelect = function() {
        return this.cardTypeSelect.element(by.css('option:checked')).getText();
    };

    cardTypeSelectLastOption = function() {
        this.cardTypeSelect.all(by.tagName('option')).last().click();
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
