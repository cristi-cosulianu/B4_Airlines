import { BaseEntity } from './../../shared';

export class Rating implements BaseEntity {
    constructor(
        public id?: number,
        public flightId?: number,
        public rating?: number,
        public userId?: number,
    ) {
    }
}
