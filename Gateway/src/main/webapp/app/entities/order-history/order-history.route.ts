import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrderHistoryComponent } from './order-history.component';
import { OrderHistoryDetailComponent } from './order-history-detail.component';
import { OrderHistoryPopupComponent } from './order-history-dialog.component';
import { OrderHistoryDeletePopupComponent } from './order-history-delete-dialog.component';

export const orderHistoryRoute: Routes = [
    {
        path: 'order-history',
        component: OrderHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderHistories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-history/:id',
        component: OrderHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderHistoryPopupRoute: Routes = [
    {
        path: 'order-history-new',
        component: OrderHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-history/:id/edit',
        component: OrderHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-history/:id/delete',
        component: OrderHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
