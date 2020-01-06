import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpEvent,HttpHandler, HttpRequest} from '@angular/common/http';
import { observable, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})



export class TokenService implements HttpInterceptor{
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req= req.clone({
      setHeaders:{
        Authorization: 'Bearer'
      }
    })
    return next.handle(req);
  }
  constructor() { }
}
