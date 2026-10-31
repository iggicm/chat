import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {forumRootUrl} from './Constants';
import {UntypedFormGroup} from '@angular/forms';
import {MyOption} from './domain/model/MyOption';

@Injectable({
  providedIn: 'root'
})
export class DebateService {

   userid:string = environment.userdescriptor.userDetails.userid;
  constructor(private httpClient:HttpClient) { }



  getDebateById(dabateId:string):Observable<any>{
    return this.httpClient.get(forumRootUrl + 'debates/' + dabateId + '?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
  }

  getComments(dabateId:string):Observable<any>{
    return this.httpClient.get(forumRootUrl + 'debates/' + dabateId + '/comments?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
  }


  getDebateResults():Observable<any>{
    return this.httpClient.get(forumRootUrl + 'results?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
  }

  submitProject(url:string, form: UntypedFormGroup, method:string, options:Array<MyOption>):Observable<any>{
    let  option = {};
    /*
    headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
         .set('Authorization', 'Bearer '+ appStore.getState().tokenState.token.accessToken)
     */
    for (let opt of options) {
      option[opt.key] = opt.value;
    }
    if (method.toLocaleUpperCase() === 'POST'){
      return this.httpClient.post(url, form.value, option);
    }

    if (method.toLocaleUpperCase() === 'GET'){
      //console.log('\n\nMethod: ' + method);
      //console.log('\n\nForm: ' + JSON.stringify(form.value));
      return this.httpClient.get(url,  option);
    }
  }

  moderatorProposition(debateid:string):Observable<any>{
    return this.httpClient.post(forumRootUrl + 'debates/' + debateid+ '/candidatures?scope=USER', {}, {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token),  'params':{
      candidateid:this.userid,
    }
    });
  }

  closeDebate(debateid: string):Observable<any>{
    return this.httpClient.post(forumRootUrl + 'debates/'+debateid+'?scope=USER',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'CLOSED',
        }
      });
  }

  reOpen(debateid: string):Observable<any>{
    return this.httpClient.post(forumRootUrl + 'debates/'+debateid+'?scope=ADMINISTRATOR',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'REOPENED',
        }
      });
  }

}
