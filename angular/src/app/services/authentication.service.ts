import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { UserLoginDto } from '../components/model/acount/account.model';
import { AppConst } from '../shared/AppConsts';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {

  }

  getUser(){
    const user: any = localStorage.getItem('user');
    return JSON.parse(user);
  }

  getPermission(){
    const user: any = localStorage.getItem('user');
    const permission: any = JSON.parse(user).permission;
    return permission;
  }

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Status
  status() {
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
       console.log('User not lgged in !!');
    } else {
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
         console.log('Token Expires!!');
      }
    }
    return this.isLoggedIn.asObservable();
  }

  // Login
  login(user: UserLoginDto) {
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/login', user);
  }

  // User Info
  user() {
    return this.http.get(AppConst.remoteServiceBaseUrl + '/api/user');
  }

  // Logout
  logout(allDevice: boolean){
    return this.http.post(AppConst.remoteServiceBaseUrl + '/api/logout', {allDevice:allDevice});
  }

  // Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }
    return this.http.post(AppConst.remoteServiceBaseUrl + '/api/register', data);
  }

  // Forgot Pass
  forgot(email:string){
    return this.http.post(AppConst.remoteServiceBaseUrl + '/api/forgot', {email:email});
  }

  // Reset Pass
  reset(token:string, password:string,password_confirmation:string){

    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post(AppConst.remoteServiceBaseUrl + '/api/reset', data);
  }

  refreshToken() {
    return this.http.post<any>(AppConst.remoteServiceBaseUrl + '/api/oauth/token', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  private getRefreshToken() {

  }

  private storeJwtToken(jwt: string) {

  }

}
