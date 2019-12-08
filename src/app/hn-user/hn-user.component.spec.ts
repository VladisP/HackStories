import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HnUserComponent} from './hn-user.component';

describe('HnUserComponent', () => {
    let component: HnUserComponent;
    let fixture: ComponentFixture<HnUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HnUserComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HnUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
