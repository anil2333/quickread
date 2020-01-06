import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import { ActivatedRoute, NavigationStart, Router,ParamMap } from '@angular/router';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public category;
  search:string;
  @Output() onSearchPicked: EventEmitter<any> = new EventEmitter<any>();
  constructor(private api:ApiService, public router: Router, private route:ActivatedRoute, private loaderService: LoaderService) { }

  ngOnInit() {
    this.search=this.route.snapshot.queryParamMap.get('search');
    this.getCategory();
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
  
  keyDownFunction() {
    this.onSearchPicked.emit(this.search);
    this.router.navigate(['/search'], { queryParams: { search: this.search } });
	}
}
