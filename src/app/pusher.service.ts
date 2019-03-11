import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

declare const Pusher: any;

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  commentsChannel: any;
  userAcceptedChannel: any;

  constructor() {
    // replace xxxx's with your Pusher application key
    //this.pusher = new Pusher(environment.pusher.key);
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: 'http://localhost:8001/api/members-oauth',
      encrypted: true
    });

    this.commentsChannel = this.pusher.subscribe('private-chat');
    this.userAcceptedChannel = this.pusher.subscribe('private-user-accepted');

  }


}
