import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  opened: boolean = false;
  logIn: boolean = localStorage.getItem('token')? false:true;
  constructor() { }

  ngOnInit(): void {
  }
  
  loggedout(){
    localStorage.clear();
  }
}
