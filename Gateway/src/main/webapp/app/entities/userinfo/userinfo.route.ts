import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserinfoComponent } from './userinfo.component';
import { UserinfoDetailComponent } from './userinfo-detail.component';
import { UserinfoPopupComponent } from './userinfo-dialog.component';
import { UserinfoDeletePopupComponent } from './userinfo-delete-dialog.component';

@Injectable()
export class UserinfoResolvePagingParams implements Resolve<any> {

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

export const userinfoRoute: Routes = [
    {
        path: 'userinfo',
        component: UserinfoComponent,
        resolve: {
            'pagingParams': UserinfoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userinfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'userinfo/:id',
        component: UserinfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userinfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userinfoPopupRoute: Routes = [
    {
        path: 'userinfo-new',
        component: UserinfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userinfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'userinfo/:id/edit',
        component: UserinfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userinfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'userinfo/:id/delete',
        component: UserinfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userinfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
