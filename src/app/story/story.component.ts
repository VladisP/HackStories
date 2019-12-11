import {AuthService} from './../auth/auth.service';
import {ProfileHttpService} from '../profile/services/profile-http.service';
import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IStory} from '../model/istory';

@Component({
    selector: 'tfs-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css'],
})
export class StoryComponent {
    @Input() story: IStory | null = null;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private profileHttp: ProfileHttpService,
        private snackBar: MatSnackBar,
    ) {}

    addToFavorites() {
        if (this.authService.isLoggedIn) {
            this.isLoading = true;
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
        } else {
            this.showMessage('Пожалуйста, сначала авторизируйтесь');
        }
    }

    showMessage(message: string) {
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
}
