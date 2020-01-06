import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public formFields={name:"",email:"",phone:"",message:""}
  public message;
  public alert;
  public success;
  constructor(private loaderService:LoaderService,private api:ApiService, private config:Configuration) { {
    
  } }

  ngOnInit() {
  }

  sendUsmessage(formData){
    
    this.loaderService.show();
    
    this.api.sendUsmessage(this.formFields).subscribe(
      j => {
        this.message=j;
        
        if(this.message.action=="success"){
          this.alert="";
          this.success="Mail Sent Successfully";
          formData.reset();
          this.loaderService.hide();
        }else{
          this.loaderService.hide();
          this.alert=this.message.message;
          
        }
      },
      error=>{
          this.loaderService.hide();
          this.alert=error.error.message;
      }
    )
  }

}
