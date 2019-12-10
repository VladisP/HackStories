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
    topstories: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    newstories: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    beststories: 'https://hacker-news.firebaseio.com/v0/beststories.json',
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
        return listType === 'userstories'
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
                    .filter(dto => this.isStory(dto))
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

    private isStory(dto: IStoryDto): boolean {
        return (
            'title' in dto &&
            'type' in dto &&
            'by' in dto &&
            'score' in dto &&
            'time' in dto &&
            'url' in dto &&
            dto.type === 'story'
        );
    }
}
