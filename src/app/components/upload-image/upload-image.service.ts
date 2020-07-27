import { Injectable } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private urlBase = environment.endpoint.api;

  constructor(
    // private storage: AngularFireStorage,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private setHeader() {
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  //Tarea para subir archivo
  // public tareaCloudStorage(nombreArchivo: string, datos: any) {
  //   return this.storage.upload(nombreArchivo, datos);
  // }

  // //Referencia del archivo
  // public referenciaCloudStorage(nombreArchivo: string) {
  //   return this.storage.ref(nombreArchivo);
  // }

  uploadFile(params) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  	return this.http.post(`${this.urlBase}/file/upload`, params, {headers: headers, responseType: 'text'});
  }

  getFile(file) {
    let params = {
      urlFile: file
    }
    const headers = this.setHeader();
    return this.http.post(`${this.urlBase}/file/download`, params, {headers: headers, responseType: 'text'}).pipe(
      map( b64 => `data:image/png;base64,${b64}`)
    );
  }

}
