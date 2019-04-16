import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURl = 'http://localhost:5000/api/auth/';
  jwtHelperService = new JwtHelperService;
  decodedToken: any;
constructor(private http: HttpClient) { }


login(model: any) {
  return this.http.post(this.baseURl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelperService.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
}

register(model: any) {

  return this.http.post(this.baseURl + 'register', model);
}

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
