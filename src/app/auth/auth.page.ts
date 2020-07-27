import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  slides = [
    {
      img: 'assets/img/desliza.png'
    },
    {
      img: 'assets/img/desliza2.png'
    },
    {
      img: 'assets/img/desliza3.png'
    },
    {
      img: 'assets/img/desliza4.png'
    }
  ];
  video = 'assets/videos/video.mp4';
  @ViewChild('videoIntro') videoIntro: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillLeave() {
    // Do something on page destroy
    console.log('destroy home')
    this.videoIntro.nativeElement.pause();
  }

}
