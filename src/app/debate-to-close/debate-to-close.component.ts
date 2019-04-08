import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../users/users.component';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {forumRootUrl, geoPosition, issues} from '../Constants';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UUID} from 'angular2-uuid';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';
import {DebateDetailsDialogComponent} from './debate-details-dialog/debate-details-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-debate-to-close',
  templateUrl: './debate-to-close.component.html',
  styleUrls: ['./debate-to-close.component.css'],
  styles: [`
        :host >>> .popover {
          z-index: 1;
        }
    `]
})

export class DebateToCloseComponent implements OnInit {

  @Input('debate') debate:any;

  @Input('isAdmin') isAdmin:boolean;

  @Input('connectedUserId') connectedUserId:string;

  @Output('debateClosed') debateClosed = new EventEmitter<User>();

  @Output('debateSigned') debateSigned = new EventEmitter<User>();

  @Output('debateReopened') debateReopened = new EventEmitter<User>();


  issues = issues;

  resultFormGroup: FormGroup;
  comment: FormControl = new FormControl('', Validators.required);
  issue: FormControl = new FormControl('', Validators.required);
  authorid: FormControl = new FormControl('', Validators.required);
  authoremail: FormControl = new FormControl('', Validators.required);
  authorname: FormControl = new FormControl('', Validators.required);
  action: FormControl = new FormControl('RESUME', Validators.required);



  loading:boolean;
  succesResponse:boolean;
  message:string;


  constructor(private http: HttpClient, private _formBuilder: FormBuilder,public dialog: MatDialog, private toastr: ToastrService) {
    this.loading = false;
    this.succesResponse = false;
    this.message = '';

  }

  ngOnInit() {

    this.authorid = new FormControl(this.debate.authorid, Validators.required);
    this.authoremail = new FormControl(this.debate.authoremail, Validators.required);
    this.authorname = new FormControl(this.debate.authorname, Validators.required);
    this.issue  = new FormControl('', Validators.required);


    this.resultFormGroup = this._formBuilder.group({
      comment: this.comment,
      issue:this.issue,
      authorid: this.authorid,
      authoremail:this.authoremail,
      authorname:this.authorname,
      action:this.action
    });

  }

  closeDebate(debateid: string){
    this.loading = true;
    this.message = '';
    this.succesResponse = false;
    this.http.post(forumRootUrl + 'debates/'+debateid+'?scope=USER',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'CLOSED',
        }
      }).subscribe((response:any)=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          //console.log('CLOSED SUCCESS');
          this.succesResponse = true;
          this.message = response.response;
          this.debate.state = 'CLOSED';
          this.debateClosed.emit(this.debate);
          this.toastr.success(response.response, 'CLOTURE DE DEBAT <<' + this.debate.theme + '>>',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        }else {
          this.succesResponse = false;
          this.message = response.raison;
        }

        this.loading = false;

      },error => {
        //console.log(JSON.stringify(error));
        this.loading = false;
        this.succesResponse = false;
        this.message = error.statusText;
      },
      () => {
        this.loading= false;
      });
  }

  connectedUserIsModerator(connecteduserid:string, moderators_details:Array<any>):boolean{
    for (let moderator of moderators_details){
      if (moderator.memberid === connecteduserid){
        return true;
      }
    }
    return false;
  }


  hasbeenYetSigned(adminsignatures:string):boolean{

   // console.log('signaturesssssss: ' + adminsignatures);

    let arraySignatures = JSON.parse(adminsignatures);

    //console.log('arraySignatures.length: ' + arraySignatures.length);
    return arraySignatures.length > 0;
  }

  connectedUserHasYetSign(adminsignatures: string, connecteduserid:string):boolean{
    let signatures = JSON.parse(adminsignatures);
    for (let s of signatures){
      if (s.administator_id === connecteduserid){
        return true;
      }
    }
    return false;
  }

  initiateDebateClosure(debateid:string){
    this.loading = true;
    this.message = '';
    this.succesResponse = false;
    this.http.post(forumRootUrl + 'debates/'+debateid+'?scope=ADMINISTRATOR',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'INITIATE_DEBATE_CLOSURE',
        }
      }).subscribe((response:any)=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          //console.log('INITIATE_DEBATE_CLOSURE SUCCESS');
          this.succesResponse = true;
          this.message = response.response;
          this.debate.state = 'INITIATE_DEBATE_CLOSURE';
          this.debateSigned.emit(this.debate);

          this.toastr.success(response.response, 'INITIATION DE CLOTURE DE DEBAT <<' + this.debate.theme + '>>',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        }else {
          this.succesResponse = false;
          this.message = response.raison;
        }

        this.loading = false;

      },error => {
        //console.log(JSON.stringify(error));
        this.loading = false;
        this.succesResponse = false;
        this.message = error.statusText;
      },
      () => {
        this.loading= false;
      });
  }

  signeDebateClosure(debateid:string){
    this.loading = true;
    this.message = '';
    this.succesResponse = false;
    this.http.post(forumRootUrl + 'debates/'+debateid+'?scope=ADMINISTRATOR',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'SIGN',
        }
      }).subscribe((response:any)=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          //console.log('SIGN SUCCESS');
          this.succesResponse = true;
          this.message = response.response;
          //this.debate.state = 'INITIATE_DEBATE_CLOSURE';
          this.debateSigned.emit(this.debate);
          this.toastr.success(response.response, 'SIGNATURE DE CLOTURE DE DEBAT <<' + this.debate.theme + '>>',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        }else {
          this.succesResponse = false;
          this.message = response.raison;
        }
        this.loading = false;
      },error => {
        //console.log(JSON.stringify(error));
        this.loading = false;
        this.succesResponse = false;
        this.message = error.statusText;
      },
      () => {
        this.loading= false;
      });
  }


  reOpen(debateid: string){
    let userid:string = environment.userdescriptor.userDetails.userid;
//Route::post('debates/{debateid}/candidatures', 'DebatesController@registerCandidature')->middleware(['auth:api']);
    this.loading = true;
    this.http.post(forumRootUrl + 'closeddebates/'+debateid+'?scope=ADMINISTRATOR',
      {},{
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{
          action:'REOPENED',
        }
      }).subscribe((response: any)=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          //console.log('REOPENED SUCCESS');
          this.succesResponse = true;
          this.message = response.response;
          this.debate.state = 'REOPENED';
          this.debateReopened.emit(this.debate);
          this.toastr.success(response.response, 'REOUVERTURE DE DEBAT <<' + this.debate.theme + '>>',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        }else {
          this.succesResponse = false;
          this.message = response.raison;
        }

        this.loading = false;

      },error => {
        //console.log(JSON.stringify(error));
        this.loading = false;
        this.succesResponse = false;
        this.message = error.statusText;
      },
      () => {
        this.loading= false;
      });
  }

  resumeDebate(debateid){

    if (this.resultFormGroup.valid){
      let userid:string = environment.userdescriptor.userDetails.userid;
//Route::post('debates/{debateid}/candidatures', 'DebatesController@registerCandidature')->middleware(['auth:api']);
      //console.log('this.resultFormGroup.value: ' + JSON.stringify(this.resultFormGroup.value));
      this.loading = true;
      this.message = '';
      this.succesResponse = false;
      this.http.post(forumRootUrl + 'closeddebates/'+debateid+'?scope=ADMINISTRATOR',
        {},{
          'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
            .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':this.resultFormGroup.value
        }).subscribe((response: any)=>{

          //console.log(JSON.stringify(response));

          let succes: number = response.success;
          let faillite: number = response.faillure;
          if (succes === 1 && faillite === 0) {
            //console.log('RESUME SUCCESS');
            this.succesResponse = true;
            this.message = response.response;
            this.debate.state = 'RESUME';
            this.toastr.success(response.response, 'RESUME DE DEBAT <<' + this.debate.theme + '>>',  {
              timeOut: 10000,
              closeButton: true,
              enableHtml:true,
              positionClass: 'toast-top-full-width'

            });
          }else {
            this.succesResponse = false;
            this.message = response.raison;
          }

          this.loading = false;

        },error => {
          //console.log(JSON.stringify(error));
          this.loading = false;
          this.succesResponse = false;
          this.message = error.statusText;
        },
        () => {
          this.loading = false;
        });
    } else {
      this.loading = false;
      this.succesResponse = false;
      this.message = 'Formulaire in complete';
    }

  }

  showDebateDetails(d){
    const dialogConfig = new MatDialogConfig();


    let dialogRef = this.dialog.open(DebateDetailsDialogComponent, {
        width: '98%',
        height: '98%',
        data:{
          debate:this.debate
        }
    });
  }

  displayNone():string{
    return 'none';
  }


}
