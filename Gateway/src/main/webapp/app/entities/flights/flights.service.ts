import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Flights } from './flights.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Flights>;

@Injectable()
export class FlightsService {

    private resourceUrl =  SERVER_API_URL + 'flights/api/flights';

    constructor(private http: HttpClient) { }

    create(flights: Flights): Observable<EntityResponseType> {
        const copy = this.convert(flights);
        return this.http.post<Flights>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(flights: Flights): Observable<EntityResponseType> {
        const copy = this.convert(flights);
        return this.http.put<Flights>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    selectOptions(path: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/${path}`, {observe: 'response' });
    }

    getArrivalOptions(departureCity: string): Observable<any> {
        const departureOption = 'departure';
        return this.http.get<any>(`${this.resourceUrl}/${departureOption}/${departureCity}`, {observe: 'response' });
    }

    getDepartureOptions(arrivalCity: string): Observable<any> {
        const arrivalOption = 'arrival';
        return this.http.get<any>(`${this.resourceUrl}/${arrivalOption}/${arrivalCity}`, {observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Flights>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Flights[]>> {
        const options = createRequestOption(req);
        return this.http.get<Flights[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Flights[]>) => this.convertArrayResponse(res));
    }

    submit(departure: any, destination: any): Observable<HttpResponse<Flights[]>> {
        return this.http.get<Flights[]>(`${this.resourceUrl}/${departure}/${destination}`, { observe: 'response' })
            .map((res: HttpResponse<Flights[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Flights = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Flights[]>): HttpResponse<Flights[]> {
        const jsonResponse: Flights[] = res.body;
        const body: Flights[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Flights.
     */
    private convertItemFromServer(flights: Flights): Flights {
        const copy: Flights = Object.assign({}, flights);
        return copy;
    }

    /**
     * Convert a Flights to a JSON which can be sent to the server.
     */
    private convert(flights: Flights): Flights {
        const copy: Flights = Object.assign({}, flights);
        return copy;
    }
}
