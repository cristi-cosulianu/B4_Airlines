import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Seats } from './seats.model';
import { SeatsService } from './seats.service';

@Component({
    selector: 'jhi-seats-detail',
    templateUrl: './seats-detail.component.html'
})
export class SeatsDetailComponent implements OnInit, OnDestroy {

    seats: Seats;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private seatsService: SeatsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSeats();
    }

    load(id) {
        this.seatsService.find(id)
            .subscribe((seatsResponse: HttpResponse<Seats>) => {
                this.seats = seatsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSeats() {
        this.eventSubscriber = this.eventManager.subscribe(
            'seatsListModification',
            (response) => this.load(this.seats.id)
        );
    }
}
