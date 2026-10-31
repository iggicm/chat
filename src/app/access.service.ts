import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {idRootUrl} from './Constants';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private httpClient:HttpClient) { }

  isAdmin():Observable<any>{
    return this.httpClient.get(idRootUrl + 'confirm-admin-access-token',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{}
    });
  }

  getConnectedUserId():string{
    return environment.userdescriptor.userDetails.userid;
  }
}
