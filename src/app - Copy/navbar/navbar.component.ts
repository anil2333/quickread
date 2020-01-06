import { Component, OnInit } from '@angular/core';
import { ApiService } from '.././api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    username="Guest";
  constructor(private api:ApiService, private route:Router) {


   }

  ngOnInit() {
    this.api.checkLogin();
    this.api.isUserLoggedIn.subscribe(val => {
      if(val){
        this.isLoggedIn=val;
        const user = JSON.parse(localStorage.getItem('user'));
        this.username=user.name;
      }else{
       this.username="Guest";
      }
      });
  }

  logout(){
    this.api.logoutUser();
    this.api.checkLogin();
    this.api.isUserLoggedIn.subscribe(val => {
      this.isLoggedIn=val
    });
    this.route.navigate(['/dashboard']);
  }

}
