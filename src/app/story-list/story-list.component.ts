import {Component, OnInit} from '@angular/core';
import {StoryListHttpService} from './services/story-list-http.service';
import {IStory} from '../model/istory';

@Component({
    selector: 'tfs-story-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
    stories: IStory[] = [];
    isListLoading = false;

    constructor(private storyListHttp: StoryListHttpService) {}

    ngOnInit() {
        this.isListLoading = true;

        this.storyListHttp.getStorie$(0).subscribe(stories => {
            this.isListLoading = false;
            this.stories = stories;
        });
    }

    onScrollDown() {
        this.storyListHttp.getStorie$(this.stories.length).subscribe(stories => {
            this.stories = this.stories.concat(stories);
        });
    }
}
