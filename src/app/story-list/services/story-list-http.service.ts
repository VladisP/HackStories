import {ListType} from '../../helpers/list-type';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, map, tap} from 'rxjs/operators';
import {Observable, forkJoin, combineLatest} from 'rxjs';
import {IStory} from '../../model/istory';
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

    getStorie$(
        listType: ListType,
        isInit: boolean = false,
        count: number = 10,
    ): Observable<IStory[]> {
        return listType === 'userstories'
            ? this.getStoriesById$(this.hnUserService.userStoriesIds, count)
            : isInit
            ? this.getInitialStorie$(urls[listType], count)
            : this.getStoriesById$(this.storiesIds, count);
    }

    private getInitialStorie$(url: string, count: number): Observable<IStory[]> {
        return this.http.get<number[]>(url).pipe(
            tap(ids => (this.storiesIds = ids)),
            switchMap(ids => this.getStoriesById$(ids, count)),
        );
    }

    private getStoriesById$(ids: number[], count: number): Observable<IStory[]> {
        return forkJoin(
            ids
                .slice(0, count)
                .map(id =>
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
            tap(() => ids.splice(0, count)),
            switchMap(stories =>
                stories.length < count && ids.length > 0
                    ? combineLatest(
                          [stories],
                          this.getStoriesById$(ids, count - stories.length),
                      ).pipe(
                          map(([headStories, tailStories]) =>
                              headStories.concat(tailStories),
                          ),
                      )
                    : [stories],
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
