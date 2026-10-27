import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {UntypedFormGroup} from '@angular/forms';
import {idRootUrl} from './Constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient: HttpClient) { }

  updatePwd(form:UntypedFormGroup):Observable<any>{

    return this.httpClient.post(idRootUrl + 'users/'+environment.userdescriptor.userDetails.userid+'/change-password?scope=USER',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':form.value
      });
  }


}
