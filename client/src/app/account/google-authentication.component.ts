import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AccountService, AlertService } from '@app/_services';

@Component({
    templateUrl: 'google-authentication.component.html',
    styleUrls: ['./login.css']
})
export class GooGleAuthenticateComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    url = environment.apiUrl
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.token) {
            let user = { token: this.route.snapshot.queryParams.token }
            this.accountService.setUserToken(user)
            this.getUserData(this.route.snapshot.queryParams.token)
        } else {
            this.router.navigate(['/acount/login']);
        }


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    getUserData(token) {

        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid

        this.accountService.getUserById()
            .pipe(first())
            .subscribe(
                res => {

                    let user = {
                        token,
                        name: res.data.name,
                        email: res.data.email
                    }
                    this.accountService.setUserToken(user)
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                });
    }
}