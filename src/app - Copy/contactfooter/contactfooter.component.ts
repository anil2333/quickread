import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-contactfooter',
  templateUrl: './contactfooter.component.html',
  styleUrls: ['./contactfooter.component.css']
})
export class ContactfooterComponent implements OnInit {
  name: string;
  email: string;
  suggestions: string;
  message:any;
  alert:string;
  constructor(private api:ApiService, private config:Configuration,private loaderService: LoaderService) { 
  }

  ngOnInit() {
  }

  processForm(contactForm) {
    this.loaderService.show();
    const params ={
      name: this.name,
      email: this.email,
      suggestions: this.suggestions
    }
    this.api.sendEmailContact(params).subscribe(
      j => {
        this.message=j;
        if(this.message.action=="success"){
          this.alert=this.message.message;
          contactForm.reset();
          this.loaderService.hide();
        }else{
          this.alert=this.message.message;
          this.loaderService.hide();
        }
      }
    );
    //alert(allInfo);
  }

}
