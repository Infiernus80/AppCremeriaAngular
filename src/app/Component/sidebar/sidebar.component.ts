import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  opened = false;
  constructor() { }

  ngOnInit(): void {
    const btn = document.querySelector('#menu-btn');
    const menu = document.querySelector('#sidemenu')
    btn.addEventListener('click', e => {
      menu.classList.toggle('menu-expanded');
      menu.classList.toggle("menu-collapsed");
      document.querySelector("body").classList.toggle("body-expanded")
    });
    const Nombre = localStorage.getItem('nombre');
    const ApellidoP = localStorage.getItem('ApellidoP');
    const ApellidoM = localStorage.getItem('ApellidoM');
    document.getElementById('Nombre').innerHTML=Nombre;
  }


  // toggleSidebar() {
  //   this.opened = !this.opened;
  // }
}
