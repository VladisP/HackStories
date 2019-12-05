import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(private snackBar: MatSnackBar) {}

    showNotification() {
        this.snackBar.open('Статья добавлена в избранное', 'Закрыть', {duration: 2000});
    }
}
