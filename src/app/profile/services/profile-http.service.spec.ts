import {TestBed} from '@angular/core/testing';

import {ProfileHttpService} from './profile-http.service';

describe('ProfileHttpService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ProfileHttpService = TestBed.get(ProfileHttpService);

        expect(service).toBeTruthy();
    });
});
