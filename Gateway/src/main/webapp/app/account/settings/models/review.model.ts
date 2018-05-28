export class SettingsReview {
    public departure: string;
    public arrival: string;
    public company: string;
    public rating: number;

    constructor(
        public id: number,
        public flightId: number,
        public description: string,
    ) {
    }
}
