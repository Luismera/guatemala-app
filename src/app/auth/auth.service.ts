import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  entity: string;
  active: boolean;
  available: boolean;
  userProfiles: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase = environment.endpoint.api;

  public usuario: User;
  public token: string = '';

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    this.loadStorage();
  }

  setHeader() {
    // console.log(this.token)
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `${this.token}`
    })
  }

  isLogin() {
    return localStorage.getItem('token') ? true : false;
  }

  loadStorage() {
    // console.log('**AuthService loadStorage**')
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.clear();

    this.router.navigate(['/auth/login']);

  }

  signup(user_to_login: any) {
    return this.http.post(`${this.urlBase}/login`, user_to_login).pipe(
      map( (res: any) => {
        this.setToken(res.token)
        this.setUsuario(res.usuario)
        return res
      }),
      catchError( (error: any) => {
        return throwError(error)
      })
    );

  }

  register(params) {
    return this.http.post(`${this.urlBase}/register`, params);
  }


  /** Obenter variables */

  getUsuario(){
    return JSON.parse( localStorage.getItem('usuario') );
  }

  getToken(){
    return localStorage.getItem('token');
  }

  /** Setiar varibles */

  setUsuario(usuario){
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(this.usuario) );
  }

  setToken(token){
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  isAuth() {
    return new Observable((subscriber) => {
      let user = JSON.parse( localStorage.getItem('usuario') );
      subscriber.next(user);
    })
  }

}
