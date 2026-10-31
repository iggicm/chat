import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {forumRootUrl} from './Constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  //Route::get('debates/{debateid}/comments/{commentid}/file', 'ChatsController@getCommentFile');//->middleware('token.verification');

  getFile(debateid: string, commentid:string, file:string): Observable<Blob> {
    return this.httpClient.get(forumRootUrl + 'debates/' + debateid + '/comments/' + commentid + '/file?file=' + file + '&scope=USER', {
      responseType: 'blob',
      headers:new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
  }
}
