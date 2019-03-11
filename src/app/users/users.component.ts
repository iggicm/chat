import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PusherService} from '../pusher.service';

declare const Pusher: any;


export interface User{
  id:number;
  userid:string;
  firstname:string;
  lastname:string;
  gender:string;
  photo:string;
  country:string;
  cityofresidency:string;
  interestcenter:string;
  email:string;
  phone:string;
  enablement: number;
  accepted_by:string;
  commenttotheregistration: string;
  mustresetpassword: string;
  latitude:number;
  longitude:number;
  isconnected:number;
}

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:Array<any>;
  private observable: Observable<any>;

  pusherLogin: any;
  pusherLogout: any;
  pusherUserAccepted: any;

  loading = false;



  userAcceptedChannel: any;
  loginChannel: any;
  logoutChannel: any;

  texto : string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;



  //style="border: 1px forestgreen solid;"


  constructor(private httpClient: HttpClient) {
    this.users = [];
  }

  ngOnInit() {

    console.log('users.environment.userdescriptor:  ' + JSON.stringify(environment.userdescriptor));


    this.pusherUserAccepted = new Pusher(environment.pusher.key, {
      cluster: 'eu',
      forceTLS: true
    });

    this.pusherLogin = new Pusher(environment.pusher.key, {
      cluster: 'eu',
      forceTLS: true
    });

    this.pusherLogout = new Pusher(environment.pusher.key, {
      cluster: 'eu',
      forceTLS: true
    });



    this.userAcceptedChannel = this.pusherUserAccepted.subscribe('user-accepted');
    this.loginChannel = this.pusherLogin.subscribe('user-logedin');
    this.logoutChannel= this.pusherLogout.subscribe('user-logedout');

    this.userAcceptedChannel.bind('user-accepted',(message) => {
      let user: User = message;
      this.users.push(user);
    });

    this.loginChannel.bind('user-logedin', data => {
      //this.comments.push(data.message);
      for (let u of this.users){
        if (u.userid == data.message.userid){
          u.temoins = data.message.temoins;
          break;
        }
      }
      //this.user.isconnected = data.message.isconnected;
      console.log(JSON.stringify(data));
    });

    this.logoutChannel.bind('user-logedout', data => {
      console.log('logetout userrrrrrrrrrrr: ' + JSON.stringify(data));
      //this.comments.push(data.message);
      for (let u of this.users){
        if (u.userid == data.message.userid){
          u.temoins = data.message.temoins;
          console.log('Loget out user id: ' + data.message.userid)
          break;
        }
      }
      //this.user.isconnected = data.message.isconnected;
      //console.log(JSON.stringify(data));
    });

    this.loading = true;
    this.observable = this.httpClient.get('http://localhost:8000/api/users', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.users = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.users.push(reponse[i]);
          }

          environment.users = this.users;
        }

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        this.loading = false;
      },
      () => {

      this.loading = false;
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
    console.log('REMOVE USER: ' + JSON.stringify(user));
    /*let users = [];
    for (let u of this.users){
      if (!(u.userid === user.userid)){
        users.push(u);
      }
    }

    this.users = users;*/

  }

}
