import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, map, tap} from 'rxjs/operators';
import {Observable, forkJoin} from 'rxjs';
import {IStory} from '../../model/istory';
import {IListLoaderConfig} from '../../helpers/ilist-loader-config';
import {HnUserHttpService} from 'src/app/hn-user/services/hn-user-http.service';

interface IStoryDto {
    id: number;
    title: string;
    type: string;
    by: string;
    score: number;
    time: number;
    url: string;
}

const urls = {
    topStories: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    newStories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    bestStories: 'https://hacker-news.firebaseio.com/v0/beststories.json',
};

@Injectable({
    providedIn: 'root',
})
export class StoryListHttpService {
    private storiesIds: number[] = [];

    constructor(private http: HttpClient, private hnUserService: HnUserHttpService) {}

    getStorie$({
        listType,
        loadedStoriesCount,
        step = 10,
    }: IListLoaderConfig): Observable<IStory[]> {
        return listType === 'userStories'
            ? this.getStoriesById$(
                  this.hnUserService.userStoriesIds.slice(
                      loadedStoriesCount,
                      loadedStoriesCount + step,
                  ),
              )
            : loadedStoriesCount === 0
            ? this.getInitialStorie$(urls[listType], step)
            : this.getStoriesById$(
                  this.storiesIds.slice(loadedStoriesCount, loadedStoriesCount + step),
              );
    }

    private getInitialStorie$(url: string, step: number): Observable<IStory[]> {
        return this.http.get<number[]>(url).pipe(
            tap(ids => (this.storiesIds = ids)),
            switchMap(ids => this.getStoriesById$(ids.slice(0, step))),
        );
    }

    private getStoriesById$(ids: number[]): Observable<IStory[]> {
        return forkJoin(
            ids.map(id =>
                this.http.get<IStoryDto>(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                ),
            ),
        ).pipe(
            map(storiesDto =>
                storiesDto
                    .filter(dto => dto.type === 'story')
                    .map(
                        dto =>
                            <IStory>{
                                id: dto.id,
                                title: dto.title,
                                author: dto.by,
                                points: dto.score,
                                time: new Date(dto.time * 1000),
                                url: dto.url,
                            },
                    ),
            ),
        );
    }
}
