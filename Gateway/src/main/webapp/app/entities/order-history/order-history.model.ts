import { BaseEntity } from './../../shared';

export class OrderHistory implements BaseEntity {
    constructor(
        public id?: number,
        public ticketUserId?: string,
        public ticketFlightID?: number,
        public ticketPlaneType?: number,
        public ticketPrice?: number,
        public creditCardId?: number,
        public blind?: boolean,
        public deaf?: boolean,
        public cognitive?: boolean,
        public other?: boolean,
        public animalService?: boolean,
        public cardId?: number,
    ) {
        this.blind = false;
        this.deaf = false;
        this.cognitive = false;
        this.other = false;
        this.animalService = false;
    }
}
