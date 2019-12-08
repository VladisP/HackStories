import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, map, tap} from 'rxjs/operators';
import {Observable, forkJoin} from 'rxjs';
import {IStory} from '../../model/istory';

interface IStoryDto {
    id: number;
    title: string;
    type: string;
    by: string;
    score: number;
    time: number;
    url: string;
}

@Injectable({providedIn: 'root'})
export class StoryListHttpService {
    private topStoriesIds: number[] = [];

    constructor(private http: HttpClient) {}

    getStorie$(loadedStoriesCount: number, step: number = 10): Observable<IStory[]> {
        return loadedStoriesCount === 0
            ? this.getInitialStorie$(step)
            : this.getStoriesById$(
                  this.topStoriesIds.slice(loadedStoriesCount, loadedStoriesCount + step),
              );
    }

    private getInitialStorie$(step: number): Observable<IStory[]> {
        return this.http
            .get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json')
            .pipe(
                tap(ids => (this.topStoriesIds = ids)),
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
