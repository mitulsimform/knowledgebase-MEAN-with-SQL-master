import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({ templateUrl: 'content.component.html' })
export class ContentComponent {
    contents = null;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router, ) { }

    ngOnInit() {

        if (this.route.snapshot.params && this.route.snapshot.params.id) {
            this.accountService.getContentById(this.route.snapshot.params.id)
                .pipe(first())
                .subscribe(content => {
                    this.contents = content.data
                });
        } else {
            this.router.navigate(['/']);
        }

    }
}