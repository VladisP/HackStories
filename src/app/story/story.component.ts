import {AuthService} from './../auth/auth.service';
import {ProfileHttpService} from '../profile/services/profile-http.service';
import {ShareService, IShareButton} from '@ngx-share/core';
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IStory} from '../model/istory';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tfs-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit, OnDestroy {
    @Input() story: IStory | null = null;
    isLoading = false;
    isFavorite = false;

    private destroy$ = new Subject();

    constructor(
        public authService: AuthService,
        private profileHttp: ProfileHttpService,
        private snackBar: MatSnackBar,
        private shareService: ShareService,
    ) {}

    ngOnInit() {
        this.profileHttp
            .isFavorite$((<IStory>this.story).id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(isFavorite => (this.isFavorite = isFavorite));
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    onFavoriteClick() {
        if (this.authService.isLoggedIn) {
            this.isLoading = true;

            if (this.isFavorite) {
                this.removeFromFavorite();
            } else {
                this.addToFavorite();
            }
        } else {
            this.showMessage('Пожалуйста, сначала авторизируйтесь');
        }
    }

    private addToFavorite() {
        this.profileHttp.addToFavorite$((<IStory>this.story).id).subscribe(
            () => {
                this.isLoading = false;
                this.showMessage('Статья добавлена в избранное');
            },
            error => {
                const errorMessage =
                    error === 'duplicate'
                        ? 'Статья уже находится в избранном'
                        : 'Произошла неизвестная ошибка';

                this.isLoading = false;
                this.showMessage(errorMessage);
            },
        );
    }

    private removeFromFavorite() {
        this.profileHttp.removeFromFavorite$((<IStory>this.story).id).subscribe(
            () => {
                this.isLoading = false;
                this.showMessage('Статья удалена из избранного');
            },
            error => {
                const errorMessage =
                    error === 'not exist'
                        ? 'Статья не находится в избранном'
                        : 'Произошла неизвестная ошибка';

                this.isLoading = false;
                this.showMessage(errorMessage);
            },
        );
    }

    onShare() {
        if (!this.authService.isLoggedIn) {
            this.showMessage('Пожалуйста, сначала авторизируйтесь');
        }
    }

    private showMessage(message: string) {
        this.snackBar.open(message, 'Закрыть', {duration: 2000});
    }

    get title(): string {
        return (<IStory>this.story).title;
    }

    get author(): string {
        return (<IStory>this.story).author;
    }

    get points(): number {
        return (<IStory>this.story).points;
    }

    get datetime(): Date {
        return (<IStory>this.story).time;
    }

    get url(): string {
        return (<IStory>this.story).url;
    }

    get icon(): any {
        return (<IShareButton>this.shareService.prop.vk).icon;
    }
}
