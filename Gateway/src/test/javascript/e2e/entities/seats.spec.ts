import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Seats e2e test', () => {

    let navBarPage: NavBarPage;
    let seatsDialogPage: SeatsDialogPage;
    let seatsComponentsPage: SeatsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Seats', () => {
        navBarPage.goToEntity('seats');
        seatsComponentsPage = new SeatsComponentsPage();
        expect(seatsComponentsPage.getTitle())
            .toMatch(/Seats/);

    });

    it('should load create Seats dialog', () => {
        seatsComponentsPage.clickOnCreateButton();
        seatsDialogPage = new SeatsDialogPage();
        expect(seatsDialogPage.getModalTitle())
            .toMatch(/Create or edit a Seats/);
        seatsDialogPage.close();
    });

    it('should create and save Seats', () => {
        seatsComponentsPage.clickOnCreateButton();
        seatsDialogPage.setSeat_indexInput('5');
        expect(seatsDialogPage.getSeat_indexInput()).toMatch('5');
        seatsDialogPage.setId_flightInput('id_flight');
        expect(seatsDialogPage.getId_flightInput()).toMatch('id_flight');
        seatsDialogPage.setTypeInput('5');
        expect(seatsDialogPage.getTypeInput()).toMatch('5');
        seatsDialogPage.save();
        expect(seatsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SeatsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-seats div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SeatsDialogPage {
    modalTitle = element(by.css('h4#mySeatsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    seat_indexInput = element(by.css('input#field_seat_index'));
    id_flightInput = element(by.css('input#field_id_flight'));
    typeInput = element(by.css('input#field_type'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setSeat_indexInput = function(seat_index) {
        this.seat_indexInput.sendKeys(seat_index);
    };

    getSeat_indexInput = function() {
        return this.seat_indexInput.getAttribute('value');
    };

    setId_flightInput = function(id_flight) {
        this.id_flightInput.sendKeys(id_flight);
    };

    getId_flightInput = function() {
        return this.id_flightInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
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
