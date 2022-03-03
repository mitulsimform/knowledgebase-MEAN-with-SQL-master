import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    contents = null;
    categories = []
    myForm = new FormGroup({
        name: new FormControl(''),
        category: new FormControl(''),
    });
    constructor(private accountService: AccountService) { }
    get f() {
        return this.myForm.controls;
    }
    ngOnInit() {
        this.accountService.getAllContent('')
            .pipe(first())
            .subscribe(content => {

                this.contents = content.data
            });
        this.accountService.getCategories()
            .pipe(first())
            .subscribe(categories => {
                this.categories = categories.data

            });
    }
    submit() {
        let str;

        if (this.myForm.value.category) {
            str = '?category_id=' + this.myForm.value.category
        }

        if (this.myForm.value.name) {
            str = '?name=' + this.myForm.value.name
        }

        if (this.myForm.value.category && this.myForm.value.category) {
            str = '?category_id=' + this.myForm.value.category + '&' + 'name=' + this.myForm.value.name
        }

        this.accountService.getAllContent(str)
            .pipe(first())
            .subscribe(content => {

                this.contents = content.data
            });
    }

}