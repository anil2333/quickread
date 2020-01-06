import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-popularsummaries',
  templateUrl: './popularsummaries.component.html',
  styleUrls: ['./popularsummaries.component.css']
})
export class PopularsummariesComponent implements OnInit {
  public summary;
  public assetsURl;
  @Input() sid:number;
  @Input() showLoadMore: number;
  @Input() title: string;
  @Input() limit: string;
  @Input() orderBy: string;
  filter:any = {limit:2,page:0,cat:"",orderBy:'name',notin:0};
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 1,"infinite": true,  "autoplay": true,responsive: [
    {
    breakpoint: 768,
    settings: {
    slidesToShow: 3
    }
    },
    {
    breakpoint: 600,
    settings: {
    slidesToShow: 1
    }
    }
    ]};

  constructor(private api:ApiService, private config:Configuration,private loaderService: LoaderService) { 
    this.assetsURl=this.config.sourceUrl;
  }

  ngOnInit() {
    this.filter.limit=this.limit;
    this.filter.orderBy=this.orderBy;
    if(this.sid)
    this.filter.notin=this.sid;
    
    this.getSummary();
  }

  getSummary(){
    this.loaderService.show();
    this.api.getSummary(this.filter).subscribe(
      j => {
        this.summary=j;
        this.loaderService.hide();
      }
    );
  }
}
