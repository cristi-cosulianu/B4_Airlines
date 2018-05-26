import { BaseEntity } from './../../shared';

export class Bank implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public expirationYear?: number,
        public expirationMonth?: number,
        public name?: string,
        public ccv?: string,
        public currency?: string,
        public amount?: number,
        public expired?: boolean,
    ) {
        this.expired = false;
    }
}
