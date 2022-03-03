import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService, AlertService } from '@app/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'content.component.html' })
export class AddContentComponent {
    myFiles: string[] = [];
    categories = []
    myForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required])
    });

    constructor(
        private http: HttpClient,
        private accountService: AccountService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {

        this.accountService.getCategories()
            .pipe(first())
            .subscribe(categories => {

                if (categories.data.length > 0) {
                    this.categories = categories.data
                } else {
                    this.router.navigate(['/category/view']);
                }

            });
    }
    get f() {
        return this.myForm.controls;
    }

    onFileChange(event) {
        for (var i = 0; i < event.target.files.length; i++) {
            this.myFiles.push(event.target.files[i]);
        }
    }

    submit() {
        this.myForm
        const formData = new FormData();
        formData.append("name", this.myForm.value.name);
        formData.append("description", this.myForm.value.description);
        formData.append("category_id", this.myForm.value.category);
        for (var i = 0; i < this.myFiles.length; i++) {
            formData.append("file", this.myFiles[i]);
        }
        this.http.post('http://localhost:3000/content/create-content', formData)
            .subscribe(res => {
                this.alertService.success('Content Added successful', { keepAfterRouteChange: true });
                this.router.navigate(['/']);
            })
    }
}