import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import { ActivatedRoute, NavigationStart, Router,ParamMap } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import * as $ from 'jquery';
//declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public category;
  search:string;
  searchData = [];
  keyword = 'name';
  isLoading=false;
  @Output() onSearchPicked: EventEmitter<any> = new EventEmitter<any>();
  constructor(private api:ApiService, public router: Router, private route:ActivatedRoute, private loaderService: LoaderService) {
    
   }
 
  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    this.search=val;
    this.searchDropdown();
  }
  
  onFocused(e){
    // do something when input is focused
  }



  ngOnInit() {
    this.search=this.route.snapshot.queryParamMap.get('search');
    this.getCategory();
    $(".search_icon-mob").click(function(){
      $(".navbar").addClass("search_active"); 
  });
  $(".cross").click(function(){
    $(".navbar").removeClass("search_active");
  });

 
  }

  getCategory(){
    this.api.getcategory(1).subscribe(
      j => {this.category=j;
        this.loaderService.hide();
      }
    );
  }

  searchSubmit(e){
    this.onSearchPicked.emit(this.search);
    this.router.navigate(['/search'], { queryParams: { search: this.search } });
  }


  searchDropdown(){
    this.isLoading=true;
    this.api.getSearchList(this.search).subscribe(
      (data: any)=> {
        this.searchData=data.data;
        this.isLoading=false;
      },
      error => {
        this.searchData=[];
        this.isLoading=false;
      }); 
  }
  
  keyDownFunction() {
    this.onSearchPicked.emit(this.search);
    this.router.navigate(['/search'], { queryParams: { search: this.search } });
	}
}
