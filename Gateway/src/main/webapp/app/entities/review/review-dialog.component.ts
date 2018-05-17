import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Review } from './review.model';
import { ReviewPopupService } from './review-popup.service';
import { ReviewService } from './review.service';

@Component({
    selector: 'jhi-review-dialog',
    templateUrl: './review-dialog.component.html'
})
export class ReviewDialogComponent implements OnInit {

    review: Review;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private reviewService: ReviewService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.review.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reviewService.update(this.review));
        } else {
            this.subscribeToSaveResponse(
                this.reviewService.create(this.review));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Review>>) {
        result.subscribe((res: HttpResponse<Review>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Review) {
        this.eventManager.broadcast({ name: 'reviewListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-review-popup',
    template: ''
})
export class ReviewPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reviewPopupService: ReviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reviewPopupService
                    .open(ReviewDialogComponent as Component, params['id']);
            } else {
                this.reviewPopupService
                    .open(ReviewDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
