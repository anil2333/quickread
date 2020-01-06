import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public category;
  public assetsURl;
  constructor(private api:ApiService, private config:Configuration, private loaderService: LoaderService) { 
    this.assetsURl=this.config.sourceUrl;
  }

  ngOnInit() { this.getCategory(); 
  }

  getCategory(){
    this.loaderService.show();
    let params = {limit:50};
    this.api.getcategory(params).subscribe(
      j => {this.category=j;
      this.loaderService.hide();
      }
    );
  }

}
