import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CardService,
    CardPopupService,
    CardComponent,
    CardDetailComponent,
    CardDialogComponent,
    CardPopupComponent,
    CardDeletePopupComponent,
    CardDeleteDialogComponent,
    cardRoute,
    cardPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardRoute,
    ...cardPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardComponent,
        CardDetailComponent,
        CardDialogComponent,
        CardDeleteDialogComponent,
        CardPopupComponent,
        CardDeletePopupComponent,
    ],
    entryComponents: [
        CardComponent,
        CardDialogComponent,
        CardPopupComponent,
        CardDeleteDialogComponent,
        CardDeletePopupComponent,
    ],
    providers: [
        CardService,
        CardPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCardModule {}
