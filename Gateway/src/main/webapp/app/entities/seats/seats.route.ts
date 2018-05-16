import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SeatsComponent } from './seats.component';
import { SeatsDetailComponent } from './seats-detail.component';
import { SeatsPopupComponent } from './seats-dialog.component';
import { SeatsDeletePopupComponent } from './seats-delete-dialog.component';

@Injectable()
export class SeatsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const seatsRoute: Routes = [
    {
        path: 'seats',
        component: SeatsComponent,
        resolve: {
            'pagingParams': SeatsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'seats/:id',
        component: SeatsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const seatsPopupRoute: Routes = [
    {
        path: 'seats-new',
        component: SeatsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'seats/:id/edit',
        component: SeatsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'seats/:id/delete',
        component: SeatsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
