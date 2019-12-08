import {Component, OnInit, Input} from '@angular/core';
import {StoryListHttpService} from './services/story-list-http.service';
import {IStory} from '../model/istory';
import {ListType} from '../helpers/ilist-loader-config';

@Component({
    selector: 'tfs-story-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
    @Input() listType: ListType = 'topStories';

    stories: IStory[] = [];
    isListLoading = false;

    constructor(private storyListHttp: StoryListHttpService) {}

    ngOnInit() {
        this.isListLoading = true;

        this.storyListHttp
            .getStorie$({listType: this.listType, loadedStoriesCount: 0})
            .subscribe(stories => {
                this.isListLoading = false;
                this.stories = stories;
            });
    }

    onScrollDown() {
        this.storyListHttp
            .getStorie$({
                listType: this.listType,
                loadedStoriesCount: this.stories.length,
            })
            .subscribe(stories => {
                this.stories = this.stories.concat(stories);
            });
    }
}
