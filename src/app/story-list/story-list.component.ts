import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {StoryListHttpService} from './services/story-list-http.service';
import {IStory} from '../model/istory';
import {ListType} from '../helpers/list-type';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tfs-story-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnChanges, OnDestroy {
    @Input() listType: ListType = 'topstories';
    stories: IStory[] = [];
    isListLoading = false;

    private destroy$ = new Subject();

    constructor(private storyListHttp: StoryListHttpService) {}

    ngOnChanges() {
        this.stories = [];
        this.isListLoading = true;
        this.destroy$.next();
        this.getInitStories();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    private getInitStories() {
        this.storyListHttp
            .getStorie$(this.listType, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(stories => {
                this.isListLoading = false;
                this.stories = stories;
            });
    }

    onScrollDown() {
        this.storyListHttp
            .getStorie$(this.listType)
            .pipe(takeUntil(this.destroy$))
            .subscribe(stories => {
                this.stories = this.stories.concat(stories);
            });
    }
}
