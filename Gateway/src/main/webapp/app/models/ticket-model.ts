export class TicketModel {
    // the ID of the user
    public ticket_userID: string;
    // the ID of the flight
    public ticket_flightID: number;
    // the seats he reserved
    public ticket_seats: Array<number> = new Array<number>();
}
