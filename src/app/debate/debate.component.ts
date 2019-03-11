import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.css']
})
export class DebateComponent implements OnInit {

  //debates: Array<any>;

  observable: Observable<any>;

  isAdmin:boolean = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    /*this.observable = this.http.get('http://localhost:8001/api/debates?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        console.log('debates: ' + JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.debates = new Array<any>();
            let reponse = response.response;
            for (let i=0; i<reponse.length; i++){
              this.debates.push(reponse[i]);
            }
        }

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      },
      () => {

      });*/

    this.http.get('http://localhost:8000/api/confirm-admin-access-token',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{}
    }).toPromise().then(res=>{
      console.log('promise ' + JSON.stringify(res));

      this.isAdmin = res != '0';

      console.log('isAdmin:::::::::::::' + this.isAdmin);

    },error=>{
      this.isAdmin =  false;
    });

  }



}
