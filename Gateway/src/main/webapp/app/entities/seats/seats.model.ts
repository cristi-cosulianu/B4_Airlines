import { BaseEntity } from './../../shared';

export class Seats implements BaseEntity {
    constructor(
        public id?: number,
        public seat_index?: number,
        public id_flight?: string,
        public type?: number,
    ) {
    }
}
