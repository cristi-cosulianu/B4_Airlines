import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Review e2e test', () => {

    let navBarPage: NavBarPage;
    let reviewDialogPage: ReviewDialogPage;
    let reviewComponentsPage: ReviewComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reviews', () => {
        navBarPage.goToEntity('review');
        reviewComponentsPage = new ReviewComponentsPage();
        expect(reviewComponentsPage.getTitle())
            .toMatch(/Reviews/);

    });

    it('should load create Review dialog', () => {
        reviewComponentsPage.clickOnCreateButton();
        reviewDialogPage = new ReviewDialogPage();
        expect(reviewDialogPage.getModalTitle())
            .toMatch(/Create or edit a Review/);
        reviewDialogPage.close();
    });

    it('should create and save Reviews', () => {
        reviewComponentsPage.clickOnCreateButton();
        reviewDialogPage.setFlightIdInput('5');
        expect(reviewDialogPage.getFlightIdInput()).toMatch('5');
        reviewDialogPage.setDescriptionInput('description');
        expect(reviewDialogPage.getDescriptionInput()).toMatch('description');
        reviewDialogPage.setUserIdInput('5');
        expect(reviewDialogPage.getUserIdInput()).toMatch('5');
        reviewDialogPage.save();
        expect(reviewDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReviewComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-review div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ReviewDialogPage {
    modalTitle = element(by.css('h4#myReviewLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    flightIdInput = element(by.css('input#field_flightId'));
    descriptionInput = element(by.css('input#field_description'));
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

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
