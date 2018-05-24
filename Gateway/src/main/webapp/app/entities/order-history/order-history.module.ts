import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    OrderHistoryService,
    OrderHistoryPopupService,
    OrderHistoryComponent,
    OrderHistoryDetailComponent,
    OrderHistoryDialogComponent,
    OrderHistoryPopupComponent,
    OrderHistoryDeletePopupComponent,
    OrderHistoryDeleteDialogComponent,
    orderHistoryRoute,
    orderHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderHistoryRoute,
    ...orderHistoryPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderHistoryComponent,
        OrderHistoryDetailComponent,
        OrderHistoryDialogComponent,
        OrderHistoryDeleteDialogComponent,
        OrderHistoryPopupComponent,
        OrderHistoryDeletePopupComponent,
    ],
    entryComponents: [
        OrderHistoryComponent,
        OrderHistoryDialogComponent,
        OrderHistoryPopupComponent,
        OrderHistoryDeleteDialogComponent,
        OrderHistoryDeletePopupComponent,
    ],
    providers: [
        OrderHistoryService,
        OrderHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOrderHistoryModule {}
