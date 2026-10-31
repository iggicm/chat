import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../users/users.component';
import {idRootUrl} from '../Constants';

declare const Pusher: any;


@Component({
  standalone: false,
  selector: 'app-propose-user-as-admin',
  templateUrl: './propose-user-as-admin.component.html',
  styleUrls: ['./propose-user-as-admin.component.css']
})
export class ProposeUserAsAdminComponent implements OnInit {

  users:Array<any>;
  private observable: Observable<any>;

  pusherPropositionSigned: any;


  propositionSignedChannel: any;
  loading:boolean;
  successResponse:boolean;
  message:string;


  constructor(private httpClient: HttpClient) {
    this.users = [];
    this.loading= false;
    this.successResponse= false;
    this.message= '';
  }

  ngOnInit() {

    //console.log('users.environment.userdescriptor:  ' + JSON.stringify(environment.userdescriptor));


    this.pusherPropositionSigned = new Pusher(environment.pusher.key, {
      cluster: 'eu',
      forceTLS: true
    });




    this.propositionSignedChannel = this.pusherPropositionSigned.subscribe('proposition-signed');

    this.propositionSignedChannel.bind('user-accepted',(message) => {
      let proposition = message;

      //this.users.push(user);
    });

    this.loading= true;
    this.successResponse= false;
    this.message= '';
    this.observable = this.httpClient.get(idRootUrl + 'users-not-admin-and-not-proposed?scope=ADMINISTRATOR', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {

          this.successResponse = true;
          this.message = '';

          this.users = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.users.push(reponse[i]);
          }
        }else {
          this.successResponse = false;
          this.message = response.raison;
        }
        this.loading= false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        this.successResponse = false;
        this.message = error.statusText;
        this.loading = false;
      },
      () => {

      });

  }

  getUserById(userid:string):User{
    for (let u of this.users){
      if (u.userid == userid){
        return u;
      }
    }
    return null;
  }

  removeUserFromList(user:User){
    //console.log('REMOVE USER: ' + JSON.stringify(user));
    let users = [];
    for (let u of this.users){
      if (!(u.userid === user.userid)){
        users.push(u);
      }
    }

    this.users = users;

  }

}
