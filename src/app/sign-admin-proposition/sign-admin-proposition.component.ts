import { Component, OnInit } from '@angular/core';
import {User} from '../users/users.component';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

declare const Pusher: any;

@Component({
  selector: 'app-sign-admin-proposition',
  templateUrl: './sign-admin-proposition.component.html',
  styleUrls: ['./sign-admin-proposition.component.css']
})
export class SignAdminPropositionComponent implements OnInit {

  propositions:Array<any>;
  private observable: Observable<any>;

  pusherPropositionSigned: any;

  propositionSignedChannel: any;

  successResponse:boolean = false;
  loading:boolean = false;
  message:string = '';

  constructor(private httpClient: HttpClient) {
    this.propositions = [];
  }

  ngOnInit() {

    console.log('users.environment.userdescriptor:  ' + JSON.stringify(environment.userdescriptor));


    this.pusherPropositionSigned = new Pusher(environment.pusher.key, {
      cluster: 'eu',
      forceTLS: true
    });




    this.propositionSignedChannel = this.pusherPropositionSigned.subscribe('proposition-signed');

    this.propositionSignedChannel.bind('user-accepted',(message) => {
      let proposition = message;

      //this.users.push(user);
    });

    let connecteduserid:string = environment.userdescriptor.userDetails.userid;


    this.message = '';
    this.loading = true;
    this.successResponse = false;
    this.observable = this.httpClient.get('http://localhost:8000/api/administratorpropositions?scope=ADMINISTRATOR&adminid=' + connecteduserid, {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.propositions = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.propositions.push(reponse[i]);
          }
          this.message = '';
          this.successResponse = true;
        }else {
          this.message = response.raison;
          this.successResponse = false;
        }

        this.loading = false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        //this.loading = false;
      this.loading = false;
      this.message = error.statusText;
      this.successResponse = false;
      },
      () => {

      });

  }

  signeProposition(pid:string){
    let connecteduserid:string = environment.userdescriptor.userDetails.userid;

    this.message = '';
    this.loading = true;
    this.successResponse = false;
    let observale: Observable<any> = this.httpClient.post('http://localhost:8000/api/administratorpropositions/'+pid+'?scope=ADMINISTRATOR', {}, {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' +  environment.oauth_client.token),
      'params':{
        'adminid':connecteduserid
      }
    });
    observale.subscribe(res=>{

      console.log(JSON.stringify(res));
      if (res.success == 1 && res.faillure == 0){
        this.propositions = new Array<any>();
        let reponse = res.response;
        for (let i=0; i<reponse.length; i++){
          this.propositions.push(reponse[i]);
        }

        this.message = '';
        this.successResponse = true;
      } else {
        this.message = res.raison;
        this.successResponse = false;
      }

      this.loading = false;

    }, error=>{

      this.loading = false;
      this.message = error.statusText;
      this.successResponse = false;
      console.log(JSON.stringify(error));

    },()=>{

    });
  }


}
