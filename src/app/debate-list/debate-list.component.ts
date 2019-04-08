import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AccessService} from '../access.service';
import {forumRootUrl} from '../Constants';

@Component({
  selector: 'app-debate-list',
  templateUrl: './debate-list.component.html',
  styleUrls: ['./debate-list.component.css']
})
export class DebateListComponent implements OnInit {

  debates: Array<any>;

  loading:boolean;
  observable: Observable<any>;
  isAdmin:boolean = false;
  connectedUserId:string;

  selProposedCandidateLoading: boolean;
  selProposedCandidateResponse: boolean;
  selProposedCandidateResponseMessage:string;

  constructor(private http: HttpClient, private accessService: AccessService) {

    this.connectedUserId = environment.userdescriptor.userDetails.userid;
    this.loading = false;
  }

  ngOnInit() {

    this.loading = true;
    this.observable = this.http.get(forumRootUrl + 'debates?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.debates = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            //moderators
            reponse[i].moderators = JSON.parse(reponse[i].moderators);
            this.debates.push(reponse[i]);
          }


        }

        this.loading = false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      this.loading = false;
      },
      () => {
        this.loading = false;
      });

    this.accessService.isAdmin().subscribe(res=>{
     // console.log('promise ' + JSON.stringify(res));

      this.isAdmin = res != '0';

      //console.log('isAdmin:::::::::::::' + this.isAdmin);

    },error=>{
      this.isAdmin =  false;
    });


    /*this.http.get('http://localhost:8000/api/confirm-admin-access-token',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{}
    }).subscribe(res=>{
      console.log('promise ' + JSON.stringify(res));

      this.isAdmin = res != '0';

      //console.log('isAdmin:::::::::::::' + this.isAdmin);

    },error=>{
      this.isAdmin =  false;
    });*/


  }

  onModeratorPropositionRegisterd(d:any){
    d.connectedUserIsCandidate = true;
    /*for (let debate of this.debates){
      if (debate.debateid == d.debateid){
        let moderators = debate.moderators;
        moderators.push(this.connectedUserId);
        debate.moderators = JSON.stringify(moderators);
        //debate.state = 'CLOSED';
        break;
      }
    }*/
  }

  onDebateClosed(d:any){
    let newDebates = [];
    for (let debate of this.debates){
      if (debate.debateid === d.debateid){
        //console.log('CLOSURE: ' + JSON.stringify(d));
        //debate.state = 'CLOSED';
        //break;
      }else {
        newDebates.push(debate);
      }
    }
    this.debates = newDebates;
  }

  onDebateReopened(d:any){
    for (let debate of this.debates){
      if (debate.debateid == d.debateid){
        debate.state = 'ACCEPTED';
        break;
      }
    }
  }

//Route::post('debates/{debateid}/close', 'DebatesController@closeDebate')->middleware(['auth:api']);

}
