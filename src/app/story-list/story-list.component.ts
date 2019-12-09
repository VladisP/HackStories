import {Component, OnInit} from '@angular/core';
import {StoryListHttpService} from './services/story-list-http.service';
import {IStory} from '../model/istory';
import {isListType} from '../helpers/ilist-loader-config';
import {ListType} from '../helpers/ilist-loader-config';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'tfs-story-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
    listType: ListType = 'topstories';
    stories: IStory[] = [];
    isListLoading = false;

    constructor(
        private storyListHttp: StoryListHttpService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(map(paramMap => paramMap.get('type')))
            .subscribe(type => {
                if (type === null || isListType(type)) {
                    this.listType = type === null ? 'userstories' : <ListType>type;
                    this.stories = [];
                    this.isListLoading = true;

                    this.getInitStories();

                    return;
                }

                this.router.navigate(['not-found']);
            });
    }

    private getInitStories() {
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
