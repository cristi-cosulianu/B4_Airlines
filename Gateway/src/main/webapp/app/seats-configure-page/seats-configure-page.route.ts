import { Route } from '@angular/router';
import { SeatsConfigurePageComponent } from './seats-configure-page.component';

export const seatsRoute: Route = {
    path: 'seats-configure-page',
    component: SeatsConfigurePageComponent,
    data: {
        authorities: [],
        pageTitle: 'Seats'
    }
};
