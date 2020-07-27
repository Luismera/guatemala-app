import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  banner = 'assets/img/desliza5.png';
  public email: string = '';
  public password: string = '';
  isloading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { 
    // console.log('LoginPage')
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.email === '' && this.password === '') {
      this.presentAlert('Todos los campos son requeridos');
      return;
    }

    this.isloading = true;
    this.authService.signup({email: this.email, password: this.password}).subscribe((token) => this.handlerSuccess(true), err => this.handlerError(err));
  }

  private handlerSuccess(tag) {
    // console.log(usuario)
    this.isloading = false;
    this.email = '';
    this.password = '';
    this.router.navigateByUrl('/page/tabs/dashboard');
  }

  private handlerError(error) {
    console.log(error)
    this.isloading = false;
    this.presentAlert('Usuario o contraseña incorrectos por favor valide y vuelva a intentar');
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
