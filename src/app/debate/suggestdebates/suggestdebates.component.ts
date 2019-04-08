import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {forumRootUrl} from '../../Constants';

@Component({
  selector: 'app-suggestdebates',
  templateUrl: './suggestdebates.component.html',
  styleUrls: ['./suggestdebates.component.css']
})
export class SuggestdebatesComponent implements OnInit {

  suggesteddebates: Array<any>;

  observable: Observable<any>;

  loading:boolean;
  succesResponse:boolean;
  message:string;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    this.loading = true;
    this.succesResponse = false;
    this.message = '';

    this.observable = this.http.get(forumRootUrl + 'suggesteddebates?scope=ADMINISTRATOR', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.succesResponse = true;
          this.message = '';
          this.suggesteddebates = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.suggesteddebates.push(reponse[i]);
          }
        }else{
          this.succesResponse = false;
          this.message = response.raison;
        }
        this.loading = false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      this.loading = false;
      this.succesResponse = false;
      this.message = error.statusText;
      },
      () => {
        this.loading = false;

      });

  }

  takeDecisionOnDebate(debatid:string, action:string, decision:string){

    this.loading = true;
    this.succesResponse = false;
    this.message = '';

    this.observable = this.http.post(forumRootUrl + 'suggesteddebates/'+debatid+'?scope=ADMINISTRATOR',
      {},{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
        action:action, //'VALIDATE',
          decision: decision//'ACCEPTED'
        }
    });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.succesResponse = true;
          this.message = response.response;
          for (let i=0; i<this.suggesteddebates.length; i++){
            if (this.suggesteddebates[i].suggesteddebateid === debatid) {

              if (decision == 'REFUSED'){
                this.suggesteddebates[i].state= decision;
              } else if (decision == 'ACCEPTED') {
                this.suggesteddebates.splice(i, 1);
              }
              break;
            }


          }
         /* this.suggesteddebates = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.suggesteddebates.push(reponse[i]);
          }*/
        }else{
          this.succesResponse = false;
          this.message = response.raison;
        }
        this.loading = false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        this.loading = false;
        this.succesResponse = false;
        this.message = error.statusText;
      },
      () => {
        this.loading = false;
      });

  }

}
