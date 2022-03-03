import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({ templateUrl: 'category.component.html' })
export class CategoryComponent {
    categories = null;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router, ) { }

    ngOnInit() {
        this.accountService.getCategories()
            .pipe(first())
            .subscribe(categories => {

                this.categories = categories.data
            });
    }
}