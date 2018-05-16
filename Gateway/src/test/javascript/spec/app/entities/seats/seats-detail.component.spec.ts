/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { SeatsDetailComponent } from '../../../../../../main/webapp/app/entities/seats/seats-detail.component';
import { SeatsService } from '../../../../../../main/webapp/app/entities/seats/seats.service';
import { Seats } from '../../../../../../main/webapp/app/entities/seats/seats.model';

describe('Component Tests', () => {

    describe('Seats Management Detail Component', () => {
        let comp: SeatsDetailComponent;
        let fixture: ComponentFixture<SeatsDetailComponent>;
        let service: SeatsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SeatsDetailComponent],
                providers: [
                    SeatsService
                ]
            })
            .overrideTemplate(SeatsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeatsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeatsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Seats(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.seats).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
