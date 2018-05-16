import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SeatsService,
    SeatsPopupService,
    SeatsComponent,
    SeatsDetailComponent,
    SeatsDialogComponent,
    SeatsPopupComponent,
    SeatsDeletePopupComponent,
    SeatsDeleteDialogComponent,
    seatsRoute,
    seatsPopupRoute,
    SeatsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...seatsRoute,
    ...seatsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SeatsComponent,
        SeatsDetailComponent,
        SeatsDialogComponent,
        SeatsDeleteDialogComponent,
        SeatsPopupComponent,
        SeatsDeletePopupComponent,
    ],
    entryComponents: [
        SeatsComponent,
        SeatsDialogComponent,
        SeatsPopupComponent,
        SeatsDeleteDialogComponent,
        SeatsDeletePopupComponent,
    ],
    providers: [
        SeatsService,
        SeatsPopupService,
        SeatsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySeatsModule {}
