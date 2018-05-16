import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Userinfo e2e test', () => {

    let navBarPage: NavBarPage;
    let userinfoDialogPage: UserinfoDialogPage;
    let userinfoComponentsPage: UserinfoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Userinfos', () => {
        navBarPage.goToEntity('userinfo');
        userinfoComponentsPage = new UserinfoComponentsPage();
        expect(userinfoComponentsPage.getTitle())
            .toMatch(/Userinfos/);

    });

    it('should load create Userinfo dialog', () => {
        userinfoComponentsPage.clickOnCreateButton();
        userinfoDialogPage = new UserinfoDialogPage();
        expect(userinfoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Userinfo/);
        userinfoDialogPage.close();
    });

    it('should create and save Userinfos', () => {
        userinfoComponentsPage.clickOnCreateButton();
        userinfoDialogPage.setUidInput('uid');
        expect(userinfoDialogPage.getUidInput()).toMatch('uid');
        userinfoDialogPage.setCnpInput('cnp');
        expect(userinfoDialogPage.getCnpInput()).toMatch('cnp');
        userinfoDialogPage.setNameInput('name');
        expect(userinfoDialogPage.getNameInput()).toMatch('name');
        userinfoDialogPage.setPrenumeInput('prenume');
        expect(userinfoDialogPage.getPrenumeInput()).toMatch('prenume');
        userinfoDialogPage.setDateOfBirthInput('2000-12-31');
        expect(userinfoDialogPage.getDateOfBirthInput()).toMatch('2000-12-31');
        userinfoDialogPage.setAdressInput('adress');
        expect(userinfoDialogPage.getAdressInput()).toMatch('adress');
        userinfoDialogPage.setPhoneNumberInput('phoneNumber');
        expect(userinfoDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        userinfoDialogPage.setIdTypeInput('idType');
        expect(userinfoDialogPage.getIdTypeInput()).toMatch('idType');
        userinfoDialogPage.setSerialNumberInput('serialNumber');
        expect(userinfoDialogPage.getSerialNumberInput()).toMatch('serialNumber');
        userinfoDialogPage.setEmittingCountryInput('emittingCountry');
        expect(userinfoDialogPage.getEmittingCountryInput()).toMatch('emittingCountry');
        userinfoDialogPage.setExpiringDateInput('2000-12-31');
        expect(userinfoDialogPage.getExpiringDateInput()).toMatch('2000-12-31');
        userinfoDialogPage.setLoginidInput('loginid');
        expect(userinfoDialogPage.getLoginidInput()).toMatch('loginid');
        userinfoDialogPage.save();
        expect(userinfoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserinfoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-userinfo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UserinfoDialogPage {
    modalTitle = element(by.css('h4#myUserinfoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    uidInput = element(by.css('input#field_uid'));
    cnpInput = element(by.css('input#field_cnp'));
    nameInput = element(by.css('input#field_name'));
    prenumeInput = element(by.css('input#field_prenume'));
    dateOfBirthInput = element(by.css('input#field_dateOfBirth'));
    adressInput = element(by.css('input#field_adress'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    idTypeInput = element(by.css('input#field_idType'));
    serialNumberInput = element(by.css('input#field_serialNumber'));
    emittingCountryInput = element(by.css('input#field_emittingCountry'));
    expiringDateInput = element(by.css('input#field_expiringDate'));
    loginidInput = element(by.css('input#field_loginid'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setUidInput = function(uid) {
        this.uidInput.sendKeys(uid);
    };

    getUidInput = function() {
        return this.uidInput.getAttribute('value');
    };

    setCnpInput = function(cnp) {
        this.cnpInput.sendKeys(cnp);
    };

    getCnpInput = function() {
        return this.cnpInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setPrenumeInput = function(prenume) {
        this.prenumeInput.sendKeys(prenume);
    };

    getPrenumeInput = function() {
        return this.prenumeInput.getAttribute('value');
    };

    setDateOfBirthInput = function(dateOfBirth) {
        this.dateOfBirthInput.sendKeys(dateOfBirth);
    };

    getDateOfBirthInput = function() {
        return this.dateOfBirthInput.getAttribute('value');
    };

    setAdressInput = function(adress) {
        this.adressInput.sendKeys(adress);
    };

    getAdressInput = function() {
        return this.adressInput.getAttribute('value');
    };

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setIdTypeInput = function(idType) {
        this.idTypeInput.sendKeys(idType);
    };

    getIdTypeInput = function() {
        return this.idTypeInput.getAttribute('value');
    };

    setSerialNumberInput = function(serialNumber) {
        this.serialNumberInput.sendKeys(serialNumber);
    };

    getSerialNumberInput = function() {
        return this.serialNumberInput.getAttribute('value');
    };

    setEmittingCountryInput = function(emittingCountry) {
        this.emittingCountryInput.sendKeys(emittingCountry);
    };

    getEmittingCountryInput = function() {
        return this.emittingCountryInput.getAttribute('value');
    };

    setExpiringDateInput = function(expiringDate) {
        this.expiringDateInput.sendKeys(expiringDate);
    };

    getExpiringDateInput = function() {
        return this.expiringDateInput.getAttribute('value');
    };

    setLoginidInput = function(loginid) {
        this.loginidInput.sendKeys(loginid);
    };

    getLoginidInput = function() {
        return this.loginidInput.getAttribute('value');
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
