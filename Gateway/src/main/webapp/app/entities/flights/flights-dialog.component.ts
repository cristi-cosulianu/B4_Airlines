import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Flights } from './flights.model';
import { FlightsPopupService } from './flights-popup.service';
import { FlightsService } from './flights.service';

@Component({
    selector: 'jhi-flights-dialog',
    templateUrl: './flights-dialog.component.html'
})
export class FlightsDialogComponent implements OnInit {

    flights: Flights;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private flightsService: FlightsService,
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
        if (this.flights.id !== undefined) {
            this.subscribeToSaveResponse(
                this.flightsService.update(this.flights));
        } else {
            this.subscribeToSaveResponse(
                this.flightsService.create(this.flights));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Flights>>) {
        result.subscribe((res: HttpResponse<Flights>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Flights) {
        this.eventManager.broadcast({ name: 'flightsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-flights-popup',
    template: ''
})
export class FlightsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flightsPopupService: FlightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.flightsPopupService
                    .open(FlightsDialogComponent as Component, params['id']);
            } else {
                this.flightsPopupService
                    .open(FlightsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
