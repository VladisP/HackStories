import {TestBed} from '@angular/core/testing';

import {HnUserHttpService} from './hn-user-http.service';

describe('HnUserHttpService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: HnUserHttpService = TestBed.get(HnUserHttpService);

        expect(service).toBeTruthy();
    });
});
