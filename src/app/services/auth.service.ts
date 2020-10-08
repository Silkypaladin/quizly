import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mapTo, tap, catchError } from 'rxjs/operators'
import { User } from '../models/user';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  
  constructor(private http: HttpClient,) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));
    this.user = this.userSubject.asObservable();
   }

   getCurrentUser(): User {
     return this.userSubject.value;
   }
   
   login(username, password) {
     let headers = new HttpHeaders().set('Authorization', 'Basic ' + window.btoa(`${username}:${password}`));
     return this.http.get(`${environment.apiUrl}/login`, {headers}).pipe(
       tap(res => this.performUserLogin(res)),
       mapTo(true),
       catchError(err => {
        console.log(err.error);
        return of(false);
       }));
   }

   logout() {
     localStorage.removeItem('user');
     this.userSubject.next(null);
   }

   performUserLogin(res) {
    localStorage.setItem('user', JSON.stringify(res));
    this.userSubject.next(res);
   }
}