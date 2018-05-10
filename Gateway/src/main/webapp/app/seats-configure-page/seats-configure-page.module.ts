import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GatewaySharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { seatsRoute, SeatsConfigurePageComponent } from '.';

@NgModule ({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild([ seatsRoute ])
    ],
    declarations: [
        SeatsConfigurePageComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeatsConfigurePageModule {}
