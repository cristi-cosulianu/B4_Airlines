import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Flights } from './flights.model';
import { FlightsPopupService } from './flights-popup.service';
import { FlightsService } from './flights.service';

@Component({
    selector: 'jhi-flights-delete-dialog',
    templateUrl: './flights-delete-dialog.component.html'
})
export class FlightsDeleteDialogComponent {

    flights: Flights;

    constructor(
        private flightsService: FlightsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'flightsListModification',
                content: 'Deleted an flights'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flights-delete-popup',
    template: ''
})
export class FlightsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flightsPopupService: FlightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.flightsPopupService
                .open(FlightsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
