/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { FlightsComponent } from '../../../../../../main/webapp/app/entities/flights/flights.component';
import { FlightsService } from '../../../../../../main/webapp/app/entities/flights/flights.service';
import { Flights } from '../../../../../../main/webapp/app/entities/flights/flights.model';

describe('Component Tests', () => {

    describe('Flights Management Component', () => {
        let comp: FlightsComponent;
        let fixture: ComponentFixture<FlightsComponent>;
        let service: FlightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FlightsComponent],
                providers: [
                    FlightsService
                ]
            })
            .overrideTemplate(FlightsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlightsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Flights(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.flights[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
