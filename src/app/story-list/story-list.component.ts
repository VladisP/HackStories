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

    constructor(private storyListHttp: StoryListHttpService) {}

    ngOnInit() {
        this.storyListHttp.getStorie$().subscribe(stories => {
            this.stories = stories;
        });
    }
}
