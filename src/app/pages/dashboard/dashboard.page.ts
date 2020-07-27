import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user;

  constructor(
    private authService: AuthService
  ) { 
    this.user = this.authService.getUsuario();
  }

  ngOnInit() { }


  onLogout() { }

}
