import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GatewaySharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { flightRoute, FlightsPageComponent } from '.';

@NgModule (
    {
        imports: [
            GatewaySharedModule,
            RouterModule.forChild([ flightRoute ])
        ],
        declarations: [
            FlightsPageComponent
        ],
        entryComponents: [
        ],
        providers: [
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlightsPageModule {}
