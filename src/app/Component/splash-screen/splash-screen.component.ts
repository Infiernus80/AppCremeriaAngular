import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string;
  showSplash: boolean = true;
  constructor() { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.windowWidth = '-' +window.innerWidth + 'px';

      setTimeout(()=>{
        this.showSplash = !this.showSplash;
      },500);
    },3000);
  }
  

}
