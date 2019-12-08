import {TestBed} from '@angular/core/testing';

import {StoryListHttpService} from './story-list-http.service';

describe('StoryListHttpService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: StoryListHttpService = TestBed.get(StoryListHttpService);

        expect(service).toBeTruthy();
    });
});
