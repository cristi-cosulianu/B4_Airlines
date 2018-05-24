import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderHistory } from './order-history.model';
import { OrderHistoryService } from './order-history.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-order-history',
    templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
orderHistories: OrderHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderHistoryService: OrderHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.orderHistoryService.query().subscribe(
            (res: HttpResponse<OrderHistory[]>) => {
                this.orderHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrderHistory) {
        return item.id;
    }
    registerChangeInOrderHistories() {
        this.eventSubscriber = this.eventManager.subscribe('orderHistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
