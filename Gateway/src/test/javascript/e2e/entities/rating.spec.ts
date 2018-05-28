import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Rating e2e test', () => {

    let navBarPage: NavBarPage;
    let ratingDialogPage: RatingDialogPage;
    let ratingComponentsPage: RatingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ratings', () => {
        navBarPage.goToEntity('rating');
        ratingComponentsPage = new RatingComponentsPage();
        expect(ratingComponentsPage.getTitle())
            .toMatch(/Ratings/);

    });

    it('should load create Rating dialog', () => {
        ratingComponentsPage.clickOnCreateButton();
        ratingDialogPage = new RatingDialogPage();
        expect(ratingDialogPage.getModalTitle())
            .toMatch(/Create or edit a Rating/);
        ratingDialogPage.close();
    });

    it('should create and save Ratings', () => {
        ratingComponentsPage.clickOnCreateButton();
        ratingDialogPage.setFlightIdInput('5');
        expect(ratingDialogPage.getFlightIdInput()).toMatch('5');
        ratingDialogPage.setRatingInput('5');
        expect(ratingDialogPage.getRatingInput()).toMatch('5');
        ratingDialogPage.setUserIdInput('5');
        expect(ratingDialogPage.getUserIdInput()).toMatch('5');
        ratingDialogPage.save();
        expect(ratingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RatingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rating div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RatingDialogPage {
    modalTitle = element(by.css('h4#myRatingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    flightIdInput = element(by.css('input#field_flightId'));
    ratingInput = element(by.css('input#field_rating'));
    userIdInput = element(by.css('input#field_userId'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFlightIdInput = function(flightId) {
        this.flightIdInput.sendKeys(flightId);
    };

    getFlightIdInput = function() {
        return this.flightIdInput.getAttribute('value');
    };

    setRatingInput = function(rating) {
        this.ratingInput.sendKeys(rating);
    };

    getRatingInput = function() {
        return this.ratingInput.getAttribute('value');
    };

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    };

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
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
