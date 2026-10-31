import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forumRootUrl, idRootUrl} from '../Constants';

@Component({
  standalone: false,
  selector: 'app-closed-debates',
  templateUrl: './closed-debates.component.html',
  styleUrls: ['./closed-debates.component.css']
})
export class ClosedDebatesComponent implements OnInit {

  debates: Array<any>;

  loading:boolean;
  observable: Observable<any>;
  isAdmin:boolean = false;
  connectedUserId:string;

  selProposedCandidateLoading: boolean;
  selProposedCandidateResponse: boolean;
  selProposedCandidateResponseMessage:string;

  constructor(private http: HttpClient) {
    this.connectedUserId = environment.userdescriptor.userDetails.userid;
    this.loading = false;
  }

  ngOnInit() {

    this.loading = true;
    this.observable = this.http.get(forumRootUrl + 'closeddebates?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        //console.log(JSON.stringify(response));

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


    this.http.get(idRootUrl + 'confirm-admin-access-token',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{}
    }).toPromise().then(res=>{
      //console.log('promise ' + JSON.stringify(res));

      this.isAdmin = res != '0';

      //console.log('isAdmin:::::::::::::' + this.isAdmin);

    },error=>{
      this.isAdmin =  false;
    });


  }

  moderatorProposition(debateid:string){
    let userid:string = environment.userdescriptor.userDetails.userid;
//Route::post('debates/{debateid}/candidatures', 'DebatesController@registerCandidature')->middleware(['auth:api']);
    //console.log('environment.oauth_client.token: ' + environment.oauth_client.token);
    this.selProposedCandidateLoading = true;
    this.selProposedCandidateResponse = false;
    this.selProposedCandidateResponseMessage = '';
    this.observable = this.http.post(forumRootUrl + 'debates/'+debateid+'/candidatures?scope=USER',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          candidateid:userid,
        }
      });
    this.observable.subscribe(response=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          //console.log('SUCCESS');
          this.selProposedCandidateResponse = true;
          this.selProposedCandidateResponseMessage = response.response;
        }else {
          this.selProposedCandidateResponse = false;
          this.selProposedCandidateResponseMessage = response.raison;
        }

        this.selProposedCandidateLoading = false;

      },error => {
        //console.log(JSON.stringify(error));
        this.selProposedCandidateResponse = false;
        this.selProposedCandidateResponseMessage = error.statusText;
        this.selProposedCandidateLoading = false;
      },
      () => {
        this.selProposedCandidateLoading = false;
      });
  }

  afterDebateClosed(d){
    let debats = [];
    for (let debate of this.debates){
      if (!(debate.debateid === d.debateid)){
        debats.push(debate);
        // break;
      }
    }
    this.debates = debats;
  }

  afterDebateOpened(d){
    let debats = [];
    for (let debate of this.debates){
      if (!(debate.debateid === d.debateid)){
        debats.push(debate);
        // break;
      }
    }
    this.debates = debats;
  }



  afterDebateSigned(d){
    this.ngOnInit();
    //this.debates = debats;
  }
}
