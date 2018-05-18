/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { FlightsDetailComponent } from '../../../../../../main/webapp/app/entities/flights/flights-detail.component';
import { FlightsService } from '../../../../../../main/webapp/app/entities/flights/flights.service';
import { Flights } from '../../../../../../main/webapp/app/entities/flights/flights.model';

describe('Component Tests', () => {

    describe('Flights Management Detail Component', () => {
        let comp: FlightsDetailComponent;
        let fixture: ComponentFixture<FlightsDetailComponent>;
        let service: FlightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FlightsDetailComponent],
                providers: [
                    FlightsService
                ]
            })
            .overrideTemplate(FlightsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlightsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Flights(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.flights).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
