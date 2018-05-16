import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Seats } from './seats.model';
import { SeatsPopupService } from './seats-popup.service';
import { SeatsService } from './seats.service';

@Component({
    selector: 'jhi-seats-dialog',
    templateUrl: './seats-dialog.component.html'
})
export class SeatsDialogComponent implements OnInit {

    seats: Seats;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private seatsService: SeatsService,
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
        if (this.seats.id !== undefined) {
            this.subscribeToSaveResponse(
                this.seatsService.update(this.seats));
        } else {
            this.subscribeToSaveResponse(
                this.seatsService.create(this.seats));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Seats>>) {
        result.subscribe((res: HttpResponse<Seats>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Seats) {
        this.eventManager.broadcast({ name: 'seatsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-seats-popup',
    template: ''
})
export class SeatsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seatsPopupService: SeatsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.seatsPopupService
                    .open(SeatsDialogComponent as Component, params['id']);
            } else {
                this.seatsPopupService
                    .open(SeatsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
