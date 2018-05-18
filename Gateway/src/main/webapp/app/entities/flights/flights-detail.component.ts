import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Flights } from './flights.model';
import { FlightsService } from './flights.service';

@Component({
    selector: 'jhi-flights-detail',
    templateUrl: './flights-detail.component.html'
})
export class FlightsDetailComponent implements OnInit, OnDestroy {

    flights: Flights;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private flightsService: FlightsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFlights();
    }

    load(id) {
        this.flightsService.find(id)
            .subscribe((flightsResponse: HttpResponse<Flights>) => {
                this.flights = flightsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFlights() {
        this.eventSubscriber = this.eventManager.subscribe(
            'flightsListModification',
            (response) => this.load(this.flights.id)
        );
    }
}
