import { BaseEntity } from './../../shared';

export const enum CardType {
    'DEBIT',
    'CREDIT'
}

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public expirationMonth?: number,
        public expirationYear?: number,
        public name?: string,
        public ccv?: string,
        public cardType?: CardType,
    ) {
    }
}
