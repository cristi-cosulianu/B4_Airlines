import { BaseEntity } from './../../shared';

export class Flights implements BaseEntity {
    constructor(
        public id?: number,
        public departure?: string,
        public arrival?: string,
        public departureTime?: string,
        public arrivalTime?: string,
        public priceRangeMin?: number,
        public priceRangeMax?: number,
        public company?: string,
        public rating?: number,
        public planeType?: number,
    ) {
    }
}
