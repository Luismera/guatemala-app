import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isloading: boolean = false;
  public fullName: string = '';
  public email: string = '';
  public emailConfirm: string = '';
  public password: string = '';
  public passwordConfirm: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  onRegister() {
    if (this.fullName === '' && this.email === '' && this.emailConfirm === '' && this.password === '' && this.passwordConfirm === '' ) {
      this.presentAlert('Alerta', 'Todos los campos son requeridos')
      return
    }
    
    if (this.email !== this.emailConfirm) {
      this.presentAlert('Alerta', 'El correo no es igual')
      return
    }

    if (this.password !== this.passwordConfirm) {
      this.presentAlert('Alerta', 'La contraseña no es igual')
      return
    }

    this.isloading = true;

    let params = {
      name: this.fullName,
      email: this.email,
      password: this.password
    }
    this.authService.register(params).subscribe((res) => {
      this.showMessage('Usuario creado', 'Usuario creado correctamento!!', 'success');
      this.router.navigateByUrl('/auth/login');
      this.isloading = false;
    }, err => this.presentAlert('Alerta', err.message));
  }

  async presentAlert(header, message) {
    this.isloading = false;

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  showMessage(title: string, content: string, type: SweetAlertIcon) {
    Swal.fire(title, content, type);
  }

}
