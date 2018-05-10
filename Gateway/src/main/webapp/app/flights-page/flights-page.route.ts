import { Route } from '@angular/router';

import { FlightsPageComponent } from './flights-page.component';

export const flightRoute: Route = {
    path: 'flights-page',
    component: FlightsPageComponent,
    data: {
        authorities: [],
        pageTitle: 'Flights'
    }
};
