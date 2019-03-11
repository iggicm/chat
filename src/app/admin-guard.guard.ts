import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private httpClient: HttpClient, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.httpClient.get('http://localhost:8000/api/confirm-admin-access-token?scope=ADMINISTRATOR',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{}
    }).toPromise().then(res=>{
      console.log('promise ' + JSON.stringify(res));

      let boolean = res != '0';
      if (boolean === false){
        this.router.navigate(['../']);
      }

      return boolean;
    },error=>{
      return false;
    });


    //return true;
  }
}
