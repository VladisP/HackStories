import {ListType} from '../helpers/list-type';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {isListType} from '../helpers/list-type';
import {Subject} from 'rxjs';

@Component({
    selector: 'tfs-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    listType: ListType | null = null;

    private destroy$ = new Subject();

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                map(paramMap => paramMap.get('type')),
                takeUntil(this.destroy$),
            )
            .subscribe(type => {
                if (isListType(<string>type)) {
                    this.listType = <ListType>type;

                    return;
                }

                this.router.navigate(['not-found']);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
