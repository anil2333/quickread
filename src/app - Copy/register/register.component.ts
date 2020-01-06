import { Component, OnInit } from '@angular/core';
import { ApiService } from '.././api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private api:ApiService) { }
  registered =false;
  ngOnInit() {
  }

  onFormSubmit(e){
    if(e.controls.password.value !== e.controls.rpassword.value){
      return false;
    }
    const user ={
      name: e.controls.name.value,
      password: e.controls.password.value,
      email: e.controls.email.value
    }
    this.registered=this.api.registerUser(user)? true : false;
  }




}
