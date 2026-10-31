import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {DebateService} from '../../debate.service';
import {User} from '../../users/users.component';
import {ToastrService} from '../../shared/notification.service';

@Component({
  standalone: false,
  selector: 'app-debate-element',
  templateUrl: './debate-element.component.html',
  styleUrls: ['./debate-element.component.css']
})
export class DebateElementComponent implements OnInit {

  @Input('debate') debate: any;
  @Input('isAdmin') isAdmin: boolean;
  @Output('debateClosed') debateClosed = new EventEmitter<User>();
  @Output('debateReopened') debateReopened = new EventEmitter<User>();
  @Output('moderatorPropositionRegisterd') moderatorPropositionRegisterd = new EventEmitter<User>();

  selProposedCandidateResponseMessage:string = '';
  selProposedCandidateLoading = false;
  selProposedCandidateResponse:boolean = false;
  connectedUserId:string;

  constructor(private debateService: DebateService, private toastr: ToastrService) {
    this.connectedUserId = environment.userdescriptor.userDetails.userid;
  }

  ngOnInit() {
  }

  moderatorProposition(debateid:string){

    this.selProposedCandidateLoading = true;
    this.selProposedCandidateResponse = false;
    this.selProposedCandidateResponseMessage = '';

    this.debateService.moderatorProposition(debateid).subscribe(response=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          //console.log('SUCCESS');
          this.selProposedCandidateResponse = true;
          this.selProposedCandidateResponseMessage = response.response;
          this.moderatorPropositionRegisterd.emit(this.debate);
          //console.log('this.debate.moderators. ' + JSON.stringify(this.debate.moderators));
          //this.debate.moderators.push(this.connectedUserId);

        }else {
          this.selProposedCandidateResponse = false;
          this.selProposedCandidateResponseMessage = response.raison;
        }

        this.selProposedCandidateLoading = false;

      },error => {
        console.log(JSON.stringify(error));
        this.selProposedCandidateResponse = false;
        this.selProposedCandidateResponseMessage = error.statusText;
        this.selProposedCandidateLoading = false;
      },
      () => {
        this.selProposedCandidateLoading = false;
      });

   /* let userid:string = environment.userdescriptor.userDetails.userid;
//Route::post('debates/{debateid}/candidatures', 'DebatesController@registerCandidature')->middleware(['auth:api']);
    console.log('environment.oauth_client.token: ' + environment.oauth_client.token);
    this.selProposedCandidateLoading = true;
    this.selProposedCandidateResponse = false;
    this.selProposedCandidateResponseMessage = '';
    this.observable = this.http.post('http://localhost:8001/api/debates/'+debateid+'/candidatures?scope=USER',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          candidateid:userid,
        }
      });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          console.log('SUCCESS');
          this.selProposedCandidateResponse = true;
          this.selProposedCandidateResponseMessage = response.response;
        }else {
          this.selProposedCandidateResponse = false;
          this.selProposedCandidateResponseMessage = response.raison;
        }

        this.selProposedCandidateLoading = false;

      },error => {
        console.log(JSON.stringify(error));
        this.selProposedCandidateResponse = false;
        this.selProposedCandidateResponseMessage = error.statusText;
        this.selProposedCandidateLoading = false;
      },
      () => {
        this.selProposedCandidateLoading = false;
      });*/
  }


  closeDebate(debateid: string){

    this.selProposedCandidateLoading = true;
    this.selProposedCandidateResponse = false;
    this.selProposedCandidateResponseMessage = '';

    this.debateService.closeDebate(debateid).subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          console.log('CLOSED SUCCESS');
          this.selProposedCandidateResponse = true;
          this.debateClosed.emit(this.debate);
          this.toastr.success(response.response, 'CLOTURE DE DEBAT <<' + this.debate.theme + '>>',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        }else {
          this.selProposedCandidateResponse = false;
          this.selProposedCandidateResponseMessage = response.raison;
        }

        this.selProposedCandidateLoading = false;

      },error => {
        console.log(JSON.stringify(error));
        this.selProposedCandidateResponse = false;
        this.selProposedCandidateResponseMessage = error.statusText;
        this.selProposedCandidateLoading = false;
      },
      () => {
        this.selProposedCandidateLoading= false;
      });


    /*let userid:string = environment.userdescriptor.userDetails.userid;
//Route::post('debates/{debateid}/candidatures', 'DebatesController@registerCandidature')->middleware(['auth:api']);
    this.loading = true;
    this.observable = this.http.post('http://localhost:8001/api/debates/'+debateid+'?scope=ADMINISTRATOR',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'CLOSED',
        }
      });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          console.log('CLOSED SUCCESS');

          for (let debate of this.debates){
            if (debate.debateid == debateid){
              debate.state = 'CLOSED';
              break;
            }
          }
        }

        this.loading = false;

      },error => {
        console.log(JSON.stringify(error));
        this.loading = false;
      },
      () => {
        this.loading= false;
      });*/
  }

  reOpen(debateid: string){

    this.selProposedCandidateLoading = true;
    this.selProposedCandidateResponse = false;
    this.selProposedCandidateResponseMessage = '';

    this.debateService.reOpen(debateid).subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          console.log('CLOSED SUCCESS');
          this.selProposedCandidateResponse = true;

          this.debateReopened.emit(this.debate);

        }else {
          this.selProposedCandidateResponse = false;
          this.selProposedCandidateResponseMessage = response.raison;
        }

        this.selProposedCandidateLoading = false;

      },error => {
        console.log(JSON.stringify(error));
        this.selProposedCandidateLoading = false;
        this.selProposedCandidateResponse = false;
        this.selProposedCandidateResponseMessage = error.statusText;
      },
      () => {
        this.selProposedCandidateLoading = false;
      });

    /*let userid:string = environment.userdescriptor.userDetails.userid;
//Route::post('debates/{debateid}/candidatures', 'DebatesController@registerCandidature')->middleware(['auth:api']);
    this.loading = true;
    this.observable = this.http.post('http://localhost:8001/api/debates/'+debateid+'?scope=ADMINISTRATOR',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'REOPENED',
        }
      });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          console.log('CLOSED SUCCESS');

          for (let debate of this.debates){
            if (debate.debateid == debateid){
              debate.state = 'ACCEPTED';
              break;
            }
          }
        }

        this.loading = false;

      },error => {
        console.log(JSON.stringify(error));
        this.loading = false;
      },
      () => {
        this.loading = false;
      });*/
  }

  /*isNotCandidate():boolean{
    //console.log("MODERATORS::::::: " + JSON.stringify(this.debate));
    let moderators = this.debate.moderators;
    for (let id of moderators){
      if (id == this.connectedUserId){
        return false;
      }
    }
    return true;
  }*/


}
