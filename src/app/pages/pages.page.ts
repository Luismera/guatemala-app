import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  userAuth: any;
  pages =  [
    {
      title: 'Perfil',
      url: '/page/profile',
      icon: 'gauge'
    },
    {
      title: 'Promociones',
      url: '/page/dashboard',
      icon: 'sale'
    }
  ];

  selectedPath = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    })

    this.authService.isAuth().subscribe((data: any) => {
      if (data) {
        this.userAuth = data;
      }
    })
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout()
  }

}
