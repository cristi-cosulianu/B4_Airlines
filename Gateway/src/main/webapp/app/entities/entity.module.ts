import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayUserinfoModule } from './userinfo/userinfo.module';
import { GatewaySeatsModule } from './seats/seats.module';
import { GatewayReviewModule } from './review/review.module';
import { GatewayFlightsModule } from './flights/flights.module';
import { GatewayCardModule } from './card/card.module';
import { GatewayOrderHistoryModule } from './order-history/order-history.module';
import { GatewayRatingModule } from './rating/rating.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayUserinfoModule,
        GatewaySeatsModule,
        GatewayReviewModule,
        GatewayFlightsModule,
        GatewayCardModule,
        GatewayOrderHistoryModule,
        GatewayRatingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
