import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GatewaySharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { paymentRoute, PaymentPageComponent } from '.';
import { FormsModule } from '@angular/forms';

@NgModule ({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild([ paymentRoute ]),
        FormsModule
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
