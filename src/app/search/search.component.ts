import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';
import {Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public summary;
  public assetsURl;
  public orderby="name";
  public error;
  cid=0;
  userSubscription: Subscription;
  mySubscription: Subscription;
  filter:any = {limit:2,page:0,cat:"",orderBy:'name','search':""};
  constructor(private api:ApiService, private config:Configuration,private route: ActivatedRoute,private router:Router, private loader:LoaderService) {
    this.assetsURl=this.config.sourceUrl;
    /*this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        //this.router.navigated = false;
      }
    });*/
    //console.log(this.api.dataforchild);

  }

  ngOnInit() {
    this.userSubscription=this.route.queryParams.subscribe(params => {
      if(params['search']){
        this.filter.search = params['search'];
      }   
    });
    this.allSummary();
  }

  getSearchValue(search){
    this.filter.search=search;
    this.allSummary();
    this.changeQuery()
  }

  changeQuery() {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {'search':this.filter.search}});
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
}

  allSummary(){
    this.loader.show();
    this.summary=[];
    this.api.getSearchSummaries(this.filter).subscribe(j => {
      this.summary=j;
      this.loader.hide();
    },
    error => this.handleError(error));
  }

  handleError(error){
    this.error=error.error.error;
    console.log(this.error);
    this.loader.hide();
  }

  getMoreSummary(){
    this.loader.show();
    this.filter.page=this.filter.page+1;
      this.api.getSearchSummaries(this.filter).subscribe(j => {
        this.summary=this.summary.concat(j);
        this.loader.hide();
      },
      error => this.handleError(error));
  }

  orderBy(event,orderbyName){
    this.orderby=orderbyName;
    this.filter.orderBy=this.orderby;
    this.filter.page=1;
    this.allSummary();
  }
}
