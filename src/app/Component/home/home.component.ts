import { Component, OnInit } from '@angular/core';
import $ from "jquery";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened= false;
  constructor() { }

  ngOnInit(): void {
    const Name = localStorage.getItem('Nombre');
  }

}
