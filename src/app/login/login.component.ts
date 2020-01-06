import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
  }

  onLoginUser(e){
    
    const user ={
      password: e.controls.password.value,
      email: e.controls.email.value
    }

    this.api.loginUser(user);
    this.api.isUserLoggedIn.subscribe(val => {
      this.loggedIn = val;
      this.route.navigate(['/dashboard']);
    });

  }
}
