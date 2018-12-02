import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, tap } from 'rxjs/operators';
import { GlobalService } from '@app/_services';

@Injectable()
export class ServerCallInterceptor implements HttpInterceptor {
  
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const updatedRequest = request.clone({
      headers: request.headers.set("Authorization", "Some-dummyCode")
    });
    //logging the updated Parameters to browser's console
    console.log("Before making api call : ", updatedRequest);
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event.body);
            console.log("JSON.stringify(event.body):::"+JSON.stringify(event.body));
            localStorage.setItem('users', JSON.stringify(event.body));

            let usersList: any[] = JSON.parse(localStorage.getItem('users')) || [];
            GlobalService.setMyGV(usersList);

            for(var key in users){
              alert('username:::::'+JSON.parse(users[key]));
            }
          }

          if (request.url.endsWith('/users/register') && request.method === 'POST') {
            // get new user object from post body
            let newUser = request.body;
            
            alert('newUser:::'+newUser);
            
            // validation
            let duplicateUser = users.filter(user => { 
              alert('old user:::'+user.username);
              return user.username === newUser.username; }).length;
            if (duplicateUser) {
                return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
            }

            // save new user
            newUser.id = users.length + 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // respond 200 OK
            return of(new HttpResponse({ status: 200 }));
          }
          
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }
}