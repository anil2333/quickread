import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private api: ApiService, private route:Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*this.api.checkLogin();
    this.api.isUserLoggedIn.subscribe(val => val);*/

    const guest =localStorage.getItem('access_token')? false : true;
    console.log("sdfasdf");
    if(guest){
      return true;
    }
    return false;
  }
  
}
