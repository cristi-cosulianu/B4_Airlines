import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Flights e2e test', () => {

    let navBarPage: NavBarPage;
    let flightsDialogPage: FlightsDialogPage;
    let flightsComponentsPage: FlightsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Flights', () => {
        navBarPage.goToEntity('flights');
        flightsComponentsPage = new FlightsComponentsPage();
        expect(flightsComponentsPage.getTitle())
            .toMatch(/Flights/);

    });

    it('should load create Flights dialog', () => {
        flightsComponentsPage.clickOnCreateButton();
        flightsDialogPage = new FlightsDialogPage();
        expect(flightsDialogPage.getModalTitle())
            .toMatch(/Create or edit a Flights/);
        flightsDialogPage.close();
    });

    it('should create and save Flights', () => {
        flightsComponentsPage.clickOnCreateButton();
        flightsDialogPage.setDepartureInput('departure');
        expect(flightsDialogPage.getDepartureInput()).toMatch('departure');
        flightsDialogPage.setArrivalInput('arrival');
        expect(flightsDialogPage.getArrivalInput()).toMatch('arrival');
        flightsDialogPage.setDepartureTimeInput('departureTime');
        expect(flightsDialogPage.getDepartureTimeInput()).toMatch('departureTime');
        flightsDialogPage.setArrivalTimeInput('arrivalTime');
        expect(flightsDialogPage.getArrivalTimeInput()).toMatch('arrivalTime');
        flightsDialogPage.setPriceRangeMinInput('5');
        expect(flightsDialogPage.getPriceRangeMinInput()).toMatch('5');
        flightsDialogPage.setPriceRangeMaxInput('5');
        expect(flightsDialogPage.getPriceRangeMaxInput()).toMatch('5');
        flightsDialogPage.setCompanyInput('company');
        expect(flightsDialogPage.getCompanyInput()).toMatch('company');
        flightsDialogPage.setRatingInput('5');
        expect(flightsDialogPage.getRatingInput()).toMatch('5');
        flightsDialogPage.setPlaneTypeInput('5');
        expect(flightsDialogPage.getPlaneTypeInput()).toMatch('5');
        flightsDialogPage.save();
        expect(flightsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FlightsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-flights div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class FlightsDialogPage {
    modalTitle = element(by.css('h4#myFlightsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    departureInput = element(by.css('input#field_departure'));
    arrivalInput = element(by.css('input#field_arrival'));
    departureTimeInput = element(by.css('input#field_departureTime'));
    arrivalTimeInput = element(by.css('input#field_arrivalTime'));
    priceRangeMinInput = element(by.css('input#field_priceRangeMin'));
    priceRangeMaxInput = element(by.css('input#field_priceRangeMax'));
    companyInput = element(by.css('input#field_company'));
    ratingInput = element(by.css('input#field_rating'));
    planeTypeInput = element(by.css('input#field_planeType'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDepartureInput = function(departure) {
        this.departureInput.sendKeys(departure);
    };

    getDepartureInput = function() {
        return this.departureInput.getAttribute('value');
    };

    setArrivalInput = function(arrival) {
        this.arrivalInput.sendKeys(arrival);
    };

    getArrivalInput = function() {
        return this.arrivalInput.getAttribute('value');
    };

    setDepartureTimeInput = function(departureTime) {
        this.departureTimeInput.sendKeys(departureTime);
    };

    getDepartureTimeInput = function() {
        return this.departureTimeInput.getAttribute('value');
    };

    setArrivalTimeInput = function(arrivalTime) {
        this.arrivalTimeInput.sendKeys(arrivalTime);
    };

    getArrivalTimeInput = function() {
        return this.arrivalTimeInput.getAttribute('value');
    };

    setPriceRangeMinInput = function(priceRangeMin) {
        this.priceRangeMinInput.sendKeys(priceRangeMin);
    };

    getPriceRangeMinInput = function() {
        return this.priceRangeMinInput.getAttribute('value');
    };

    setPriceRangeMaxInput = function(priceRangeMax) {
        this.priceRangeMaxInput.sendKeys(priceRangeMax);
    };

    getPriceRangeMaxInput = function() {
        return this.priceRangeMaxInput.getAttribute('value');
    };

    setCompanyInput = function(company) {
        this.companyInput.sendKeys(company);
    };

    getCompanyInput = function() {
        return this.companyInput.getAttribute('value');
    };

    setRatingInput = function(rating) {
        this.ratingInput.sendKeys(rating);
    };

    getRatingInput = function() {
        return this.ratingInput.getAttribute('value');
    };

    setPlaneTypeInput = function(planeType) {
        this.planeTypeInput.sendKeys(planeType);
    };

    getPlaneTypeInput = function() {
        return this.planeTypeInput.getAttribute('value');
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
