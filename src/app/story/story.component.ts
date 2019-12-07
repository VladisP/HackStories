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

    constructor(private snackBar: MatSnackBar) {}

    showNotification() {
        this.snackBar.open('Статья добавлена в избранное', 'Закрыть', {duration: 2000});
    }
}
