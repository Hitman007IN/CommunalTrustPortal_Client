import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

import { GlobalService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _http: HttpClient,
        private globalService: GlobalService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this._http.get<User[]>(`${environment.apiUrl}/users/getAllUsers`)
        .subscribe(
            data => {
                console.log('Http Call is success from compoennt');
                //localStorage.setItem('users', JSON.stringify(User));
        }, 
            error => {
                console.log('Http Call is failed from component');
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}