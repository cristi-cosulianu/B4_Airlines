import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FlightsService,
    FlightsPopupService,
    FlightsComponent,
    FlightsDetailComponent,
    FlightsDialogComponent,
    FlightsPopupComponent,
    FlightsDeletePopupComponent,
    FlightsDeleteDialogComponent,
    flightsRoute,
    flightsPopupRoute,
    FlightsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...flightsRoute,
    ...flightsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FlightsComponent,
        FlightsDetailComponent,
        FlightsDialogComponent,
        FlightsDeleteDialogComponent,
        FlightsPopupComponent,
        FlightsDeletePopupComponent,
    ],
    entryComponents: [
        FlightsComponent,
        FlightsDialogComponent,
        FlightsPopupComponent,
        FlightsDeleteDialogComponent,
        FlightsDeletePopupComponent,
    ],
    providers: [
        FlightsService,
        FlightsPopupService,
        FlightsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFlightsModule {}
