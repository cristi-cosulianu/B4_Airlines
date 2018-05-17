import { BaseEntity } from './../../shared';

export class Review implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: string,
        public flightId?: number,
        public description?: string,
    ) {
    }
}
