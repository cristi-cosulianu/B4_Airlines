import { Route } from '@angular/router';
import { PaymentPageComponent } from './payment-page.component';

export const paymentRoute: Route = {
    path: 'payment-page',
    component: PaymentPageComponent,
    data: {
        authorities: [],
        pageTitle: 'Payment'
    }
};
