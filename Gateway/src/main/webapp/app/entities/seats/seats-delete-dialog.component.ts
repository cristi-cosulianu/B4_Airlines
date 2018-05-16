import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Seats } from './seats.model';
import { SeatsPopupService } from './seats-popup.service';
import { SeatsService } from './seats.service';

@Component({
    selector: 'jhi-seats-delete-dialog',
    templateUrl: './seats-delete-dialog.component.html'
})
export class SeatsDeleteDialogComponent {

    seats: Seats;

    constructor(
        private seatsService: SeatsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.seatsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'seatsListModification',
                content: 'Deleted an seats'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seats-delete-popup',
    template: ''
})
export class SeatsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seatsPopupService: SeatsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.seatsPopupService
                .open(SeatsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
