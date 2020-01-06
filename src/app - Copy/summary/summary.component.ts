import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Configuration} from '../configuration';
import {Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';
import { Track } from 'ngx-audio-player';   
import { LoaderService } from '../loader/loader.service';
import { ReadMoreComponent } from '../read-more.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  
})
export class SummaryComponent implements OnInit {
msaapDisplayTitle = false;
msaapDisplayPlayList = true;
msaapPageSizeOptions = [10];
msaapDisplayVolumeControls = true;
public fullChapters="";

   
// Material Style Advance Audio Player Playlist
msaapPlaylist: Track[] = [];

  userSubscription: Subscription;
  sid=0;
  public summary;
  public assetsURl;
  public error;
  public success;
  public youlike;
  public newsletter:boolean=false;
  public newsletterform={ename:"",email:""}
  filter:any = {sid:0};
  message:any;
  alert:string;
  fontSize: number;
  
  mySubscription: Subscription;
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




  public social;
  constructor(private api:ApiService, private config:Configuration,private route: ActivatedRoute,private router:Router,
    private loaderService: LoaderService) {

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          //this.router.navigated = false;
        }
      });


    this.assetsURl=this.config.sourceUrl;
    this.fontSize = 14;
    
   }

   slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

  ngOnInit() {
    this.api.SettingObservable.subscribe(setting=>{this.social=setting; }); 
    this.userSubscription=this.route.params.subscribe(params => {   this.sid = +params['sid']; });
    if(this.sid>0){
      this.filter.sid=this.sid;
      this.getSingleSummary();
    } 
    this.popularSummary();
  }

  getSingleSummary(){
    this.loaderService.show();
    this.api.getSingleSummary(this.filter).subscribe(j => {
      this.summary=j;
      if(this.summary.mp3){
        this.summary.mp3.forEach(obj => {
          if(obj.intro){
            this.msaapPlaylist.push({title:obj.name,link:this.config.sourceUrl+"/mp3/"+obj.intro});
          }

           this.fullChapters+="<h3>"+obj.name+"</h3>"+obj.text;
           
          });
      }

      this.summary.availableon=JSON.parse(this.summary.availableon);
      this.api.getSummary({cat:this.summary.categories,limit:6,notin:this.sid}).subscribe(d =>{
          this.youlike=d;
      })
      this.loaderService.hide();
    },
    error => this.handleError(error));
    console.log(this.msaapPlaylist);
  }

  handleError(error){
    this.error=error.error.error;
    this.loaderService.hide();
  }

  joinmail(){
    this.newsletter = !this.newsletter;
  }
  subscribe(form){
    this.loaderService.show();
    
    this.api.joinNewsleter(this.newsletterform).subscribe(
      j => {
        this.message=j;
        
        if(this.message.message=="success"){
          this.alert="";
          this.success="Mail List Subscribed successfully";
          form.reset();
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

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    }

    popularSummary(){
      this.api.popularSummary(this.filter).subscribe(j => {
        console.log(j);
      },
      error => {console.log("Error when increment popular");}
    );
  }



  increaseFont(){
    this.fontSize = (this.fontSize * 0.8);
  }

  decreasefont(){
    this.fontSize = (this.fontSize * 1.2);
  }
}
