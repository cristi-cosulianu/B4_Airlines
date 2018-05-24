import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Card } from './card.model';
import { CardService } from './card.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-card',
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit, OnDestroy {
cards: Card[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardService: CardService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardService.query().subscribe(
            (res: HttpResponse<Card[]>) => {
                this.cards = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Card) {
        return item.id;
    }
    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe('cardListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
