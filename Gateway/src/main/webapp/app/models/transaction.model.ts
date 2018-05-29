
export class Transaction {
    constructor(
        public number?: string,
        public expirationYear?: number,
        public expirationMonth?: number,
        public name?: string,
        public cvv?: string,
        public amount?: number,
        public isReversed?: boolean
    ) {}
}
