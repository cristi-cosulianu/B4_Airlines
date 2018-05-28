import { BaseEntity } from './../../shared';

export class Review implements BaseEntity {
    constructor(
        public id?: number,
        public flightId?: number,
        public description?: string,
        public userId?: number,
    ) {
    }
}
