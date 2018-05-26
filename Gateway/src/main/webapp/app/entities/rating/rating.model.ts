import { BaseEntity } from './../../shared';

export class Rating implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: string,
        public flightId?: number,
        public rating?: number,
    ) {
    }
}
