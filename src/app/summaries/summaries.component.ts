import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';
import {Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader/loader.service';


@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.css']
})
export class SummariesComponent implements OnInit {

  public summary;
  public assetsURl;
  public orderby="name"; 
  public error;
  public category:any={name:"Summaries",description:""};
  cid=0;
  userSubscription: Subscription;
  mySubscription: Subscription;
  querySubscription: Subscription;
  filter:any = {limit:2,page:0,cat:"",orderBy:'name'};
  constructor(private api:ApiService, private config:Configuration,private route: ActivatedRoute,private router:Router,private loaderService: LoaderService) {
    this.assetsURl=this.config.sourceUrl;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        //this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.userSubscription=this.route.params.subscribe(params => {
      this.cid = +params['cat'];
      //this.router.navigate(["/summaries/"+this.cid]);     
    });
    this.querySubscription=this.route.queryParams.subscribe(qparams => {
      this.orderby= qparams['orderby'];
    });
    if(this.cid>0){
      this.filter.cat=this.cid;
    }

    if(this.orderby){
      this.orderBy(this.orderby);
    }

    this.allSummary();
    this.getSingleCat();


    
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
}

getSingleCat(){
  this.loaderService.show();
  this.api.getSingleCategory(this.filter).subscribe(j => {
    this.category=j;
    this.loaderService.hide();
  },
  error => this.handleError(error));
  if(this.orderby)
  this.category.name=this.orderby+ " Summaries";
}

  allSummary(){
    this.loaderService.show();
    this.api.getSummary(this.filter).subscribe(j => {
      this.summary=j;
      this.loaderService.hide();
    },
    error => this.handleError(error));
  }

  handleError(error){
    this.error=error.error.error;
    console.log(this.error);
    this.loaderService.hide();
  }

  getMoreSummary(){
    this.filter.page=this.filter.page+1;
    this.loaderService.show();
      this.api.getSummary(this.filter).subscribe(j => {
        this.summary=this.summary.concat(j);
        this.loaderService.hide();
      },
      error => this.handleError(error));
  }
  


  orderBy(orderbyName){
    this.orderby=orderbyName;
    this.filter.orderBy=this.orderby;
    this.filter.page=0;
    this.allSummary();
  }
}
