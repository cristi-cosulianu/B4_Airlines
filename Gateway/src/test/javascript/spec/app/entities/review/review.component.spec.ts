/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ReviewComponent } from '../../../../../../main/webapp/app/entities/review/review.component';
import { ReviewService } from '../../../../../../main/webapp/app/entities/review/review.service';
import { Review } from '../../../../../../main/webapp/app/entities/review/review.model';

describe('Component Tests', () => {

    describe('Review Management Component', () => {
        let comp: ReviewComponent;
        let fixture: ComponentFixture<ReviewComponent>;
        let service: ReviewService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ReviewComponent],
                providers: [
                    ReviewService
                ]
            })
            .overrideTemplate(ReviewComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReviewComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReviewService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Review(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reviews[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
