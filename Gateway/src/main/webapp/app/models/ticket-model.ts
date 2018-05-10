export class TicketModel {
    public userID: string;
    public routeID: string;
    public seats: Array<number> = new Array<number>();
}
