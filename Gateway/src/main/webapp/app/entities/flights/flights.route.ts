import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FlightsComponent } from './flights.component';
import { FlightsDetailComponent } from './flights-detail.component';
import { FlightsPopupComponent } from './flights-dialog.component';
import { FlightsDeletePopupComponent } from './flights-delete-dialog.component';

@Injectable()
export class FlightsResolvePagingParams implements Resolve<any> {

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

export const flightsRoute: Routes = [
    {
        path: 'flights',
        component: FlightsComponent,
        resolve: {
            'pagingParams': FlightsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flights'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'flights/:id',
        component: FlightsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flights'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightsPopupRoute: Routes = [
    {
        path: 'flights-new',
        component: FlightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flights'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flights/:id/edit',
        component: FlightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flights'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flights/:id/delete',
        component: FlightsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Flights'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
