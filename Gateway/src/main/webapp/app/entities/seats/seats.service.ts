import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Seats } from './seats.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Seats>;

@Injectable()
export class SeatsService {

    private resourceUrl = SERVER_API_URL + 'seatsapp/api/seats';

    constructor(private http: HttpClient) { }

    create(seats: Seats): Observable<EntityResponseType> {
        const copy = this.convert(seats);
        return this.http.post<Seats>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(seats: Seats): Observable<EntityResponseType> {
        const copy = this.convert(seats);
        return this.http.put<Seats>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Seats>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Seats[]>> {
        const options = createRequestOption(req);
        return this.http.get<Seats[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Seats[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByFlightId(id: number): Observable<HttpResponse<Seats[]>> {
        return this.http.get<Seats[]>(`${this.resourceUrl}/flights/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Seats[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Seats = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Seats[]>): HttpResponse<Seats[]> {
        const jsonResponse: Seats[] = res.body;
        const body: Seats[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Seats.
     */
    private convertItemFromServer(seats: Seats): Seats {
        const copy: Seats = Object.assign({}, seats);
        return copy;
    }

    /**
     * Convert a Seats to a JSON which can be sent to the server.
     */
    private convert(seats: Seats): Seats {
        const copy: Seats = Object.assign({}, seats);
        return copy;
    }
}
