import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GatewaySharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { paymentRoute, PaymentPageComponent } from '.';

@NgModule ({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild([ paymentRoute ])
    ],
    declarations: [
        PaymentPageComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [
        PaymentPageComponent
    ]
})

export class PaymentPageModule {}
