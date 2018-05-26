import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Review } from './review.model';
import { createRequestOption } from '../../shared';
import { ReviewComponent } from '.';

export type EntityResponseType = HttpResponse<Review>;

@Injectable()
export class ReviewService {

    private resourceUrl =  SERVER_API_URL + 'reviewapp/api/reviews';

    constructor(private http: HttpClient) { }

    create(review: Review): Observable<EntityResponseType> {
        const copy = this.convert(review);
        return this.http.post<Review>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(review: Review): Observable<EntityResponseType> {
        const copy = this.convert(review);
        return this.http.put<Review>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Review>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    reviewsForFlight(flightId: number): Observable<HttpResponse<Review[]>> {
        const flights = 'flights';
        return this.http.get<Review[]>(`${this.resourceUrl}/${flights}/${flightId}`, { observe: 'response' })
            .map((res: HttpResponse<Review[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Review[]>> {
        const options = createRequestOption(req);
        return this.http.get<Review[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Review[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Review = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Review[]>): HttpResponse<Review[]> {
        const jsonResponse: Review[] = res.body;
        const body: Review[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Review.
     */
    private convertItemFromServer(review: Review): Review {
        const copy: Review = Object.assign({}, review);
        return copy;
    }

    /**
     * Convert a Review to a JSON which can be sent to the server.
     */
    private convert(review: Review): Review {
        const copy: Review = Object.assign({}, review);
        return copy;
    }
}
