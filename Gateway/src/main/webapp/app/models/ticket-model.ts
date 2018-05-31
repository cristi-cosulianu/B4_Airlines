export class TicketModel {
    // the ID of the user
    public ticket_userID: string;
    // the ID of the flight
    public ticket_flightID: number;
    // departure city
    public ticket_departure: string;
    // destination city
    public ticket_destination: string;
    // the seats he reserved
    public ticket_seats: Array<number> = new Array<number>();
    // the type of the plane
    public ticket_planeType: number;
    // the price of the ticket
    public ticket_price: number;
}
