import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, map} from 'rxjs/operators';
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
    constructor(private http: HttpClient) {}

    getStorie$(): Observable<IStory[]> {
        return this.http
            .get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json')
            .pipe(
                switchMap(ids =>
                    forkJoin(
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
                    ),
                ),
            );
    }
}
