import { CardType } from '../entities/card/';

export class OrderModel {
    // the payment card number of the user
    public cardNumber: string;
    // card expiration year
    public cardExpirationYear: number;
    // card expiration month
    public cardExpirationMonth: number;
    // the ccv of the card
    public cardCCV: string;
    // the type of the payment card
    public cardType: CardType;
    // buyers special needs list
    public specialNeeds: Array<number>;
    // the card owner's name
    public cardOwnerName: string;
}
