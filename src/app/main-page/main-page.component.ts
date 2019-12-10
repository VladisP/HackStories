import {ListType} from './../helpers/ilist-loader-config';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {isListType} from '../helpers/ilist-loader-config';

@Component({
    selector: 'tfs-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
    listType: ListType | null = null;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(map(paramMap => paramMap.get('type')))
            .subscribe(type => {
                if (isListType(<string>type)) {
                    this.listType = <ListType>type;

                    return;
                }

                this.router.navigate(['not-found']);
            });
    }
}
