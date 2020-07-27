import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  urlBase = environment.endpoint.api;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setHeader() {
    // console.log(this.token)
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `${this.authService.getToken()}`
    })
  }

  getItems() {
    const headers = this.setHeader();
    return this.http.get(`${this.urlBase}/promotions`, {headers});
  }

  getItem(id) {
    const headers = this.setHeader();
    return this.http.get(`${this.urlBase}/promotions/${id}`, {headers});
  }
}
