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

    constructor(private snackBar: MatSnackBar) {}

    addToFavorites() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.showNotification();
        }, 1000);
    }

    showNotification() {
        this.snackBar.open('Статья добавлена в избранное', 'Закрыть', {duration: 2000});
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
