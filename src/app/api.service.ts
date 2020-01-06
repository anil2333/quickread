import { Injectable } from '@angular/core';
import {Configuration} from './configuration';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  checkStatus = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.checkStatus.asObservable();
  dataforchild = new Subject<any>();
  SettingObservable: Observable<any>;
  constructor(private config:Configuration, private http: HttpClient) {this.getSomeData();}
  checkLogin(){
    //this.checkStatus.next(status);
    const token = localStorage.getItem('access_token');
    if(token){
      this.checkStatus.next(true);
    }else{
      this.checkStatus.next(false);
    }
  }
  registerUser(user:any){
    return this.http.post(this.config.apiUrl+'/register',user).subscribe(x => console.log(x));
  }

  loginUser(user:any){
    return this.http.post(this.config.apiUrl+'/login',user).subscribe((checkUser:any) => {
      console.log(checkUser);
      if(checkUser.access_token){
        localStorage.setItem('access_token',checkUser.access_token);
        localStorage.setItem('user',JSON.stringify(checkUser.user));
        this.checkLogin();
      }
    });
  }

  logoutUser(){
    return  this.http
    .post(this.config.apiUrl + '/logout', {token: localStorage.getItem('access_token')
    })
  .subscribe(message =>{
      if(message){
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.checkLogin();
      }
    })
  }

  getcategory(category:any){
    return this.http.get(this.config.apiUrl+'/getAllCategory',{ params: category });
  }
  getSummary(summary:any){
    return this.http.get(this.config.apiUrl+'/getSummaries',{ params: summary });
  }
  getSingleSummary(summary:any){
    return this.http.get(this.config.apiUrl+'/getSingleSummaries',{ params: summary });
  }
  getSingleCategory(summary:any){
    return this.http.get(this.config.apiUrl+'/getSingleCategory',{ params: summary });
  }
  getSearchSummaries(summary:any){
    return this.http.get(this.config.apiUrl+'/getSearchSummaries',{ params: summary });
  }
  sendEmailContact(data){
    return this.http.post(this.config.apiUrl+'/sendEmailContact',data);
  }
  joinNewsleter(data){
    return this.http.post(this.config.apiUrl+'/subscribeNewsletter',data);
  }
  sendUsmessage(data){
    return this.http.post(this.config.apiUrl+'/sendUsMessage',data);
  }
  popularSummary(data){
    return this.http.post(this.config.apiUrl+'/popularSummary',data);
  }
  getSearchList(data){
    return this.http.post(this.config.apiUrl+'/getSearchList',{search:data});
  }

  getSomeData(): Observable<any> {
    
    if (this.SettingObservable) {
      return this.SettingObservable;
    } else {
      this.SettingObservable=this.http.get(this.config.apiUrl+'/getSettings').pipe(share());
      return this.SettingObservable;
    }
    
  }


  sendToChild(message: any) {
    this.dataforchild.next({ text: message });
  }

  getParentData(): Observable<any> {
      return this.dataforchild.asObservable();
  }
}
