/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SeatsComponent } from '../../../../../../main/webapp/app/entities/seats/seats.component';
import { SeatsService } from '../../../../../../main/webapp/app/entities/seats/seats.service';
import { Seats } from '../../../../../../main/webapp/app/entities/seats/seats.model';

describe('Component Tests', () => {

    describe('Seats Management Component', () => {
        let comp: SeatsComponent;
        let fixture: ComponentFixture<SeatsComponent>;
        let service: SeatsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SeatsComponent],
                providers: [
                    SeatsService
                ]
            })
            .overrideTemplate(SeatsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeatsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeatsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Seats(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.seats[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
