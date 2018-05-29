import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Rating } from './rating.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Rating>;

@Injectable()
export class RatingService {

    private resourceUrl =  SERVER_API_URL + 'rating/api/ratings';

    constructor(private http: HttpClient) { }

    create(rating: Rating): Observable<EntityResponseType> {
        const copy = this.convert(rating);
        return this.http.post<Rating>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rating: Rating): Observable<EntityResponseType> {
        const copy = this.convert(rating);
        return this.http.put<Rating>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Rating>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Rating[]>> {
        const options = createRequestOption(req);
        return this.http.get<Rating[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Rating[]>) => this.convertArrayResponse(res));
    }

    ratingForUserAndFlight(flightId: number, userId: number): Observable<HttpResponse<Rating>> {
        return this.http.get<Rating>(`${this.resourceUrl}/${flightId}/${userId}`, { observe: 'response'})
        .map((res: HttpResponse<Rating>) => this.convertResponse(res));
    }

    ratingForFlight(flightId: number): Observable<HttpResponse<Rating>> {
        return this.http.get<Rating>(`${this.resourceUrl}/stats/${flightId}`, { observe: 'response'})
        .map((res: HttpResponse<Rating>) => this.convertResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Rating = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Rating[]>): HttpResponse<Rating[]> {
        const jsonResponse: Rating[] = res.body;
        const body: Rating[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Rating.
     */
    private convertItemFromServer(rating: Rating): Rating {
        const copy: Rating = Object.assign({}, rating);
        return copy;
    }

    /**
     * Convert a Rating to a JSON which can be sent to the server.
     */
    private convert(rating: Rating): Rating {
        const copy: Rating = Object.assign({}, rating);
        return copy;
    }
}
