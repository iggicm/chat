import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

import {MyAdapter} from '../my-adapter/my-adapter';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {forumRootUrl, geoPosition} from '../Constants';

import {ScrollEvent} from '../shared/legacy-widgets.module';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';
import {MemberDialogComponent} from '../revoke-member/member-dialog/member-dialog.component';
import {ShowFileDialogComponent} from '../show-file-dialog/show-file-dialog.component';

declare const Pusher: any;

@Component({
  standalone: false,
  selector: 'app-debate-item',
  templateUrl: './debate-item.component.html',
  styleUrls: ['./debate-item.component.css']
})
export class DebateItemComponent implements OnInit {

  debate: any;
  comments:Array<any>;
  debateid:any;

  observable: Observable<any>;
  defined: boolean=false;


  pusher: any;
  commentsChannel: any;
  udatedCommentsChannel:any;

  //filename: UntypedFormControl;


  @ViewChild('attachedFile', {static: false})
  fileInput: ElementRef;

  file:File;

  @ViewChild('debatetheme', {static: false}) debatetheme;


  //https://www.npmjs.com/package/ng-chat
  //https://www.nexmo.com/blog/2018/03/28/build-chat-app-angular-material-stitch-javascript-dr/


  userId = 1;
  title = '';
  body:UntypedFormControl = new UntypedFormControl('', Validators.required);
  commentid = new UntypedFormControl(crypto.randomUUID(), Validators.required);

  latitude: UntypedFormControl =  new UntypedFormControl();
  longitude: UntypedFormControl =  new UntypedFormControl();
  attachedFile: UntypedFormControl = new UntypedFormControl();
  filename: UntypedFormControl = new UntypedFormControl();

  commentFormGroup: UntypedFormGroup;

  validForm:boolean = false;

  successResponse:boolean;
  loading: boolean;
  message: string;

  loadingComment: boolean;



  //public adapter: ChatAdapter = new MyAdapter();

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb:UntypedFormBuilder, public dialog: MatDialog) {
    console.log('environment.userdescriptor.userDetails = '  + JSON.stringify(environment.userdescriptor));
    this.userId = environment.userdescriptor.userDetails.userid;//999;
    //this.defined = true;

    this.latitude.setValue(geoPosition.latitude);
    this.longitude.setValue(geoPosition.longitude);
    this.commentFormGroup = this.fb.group({
      body:this.body,
      latitude: this.latitude,
      longitude: this.longitude,
      attachedFile:this.attachedFile,
      filename:this.filename,
      commentid:this.commentid
    });

    //

    this.commentFormGroup.valueChanges.subscribe(data=>{
      this.validForm = this.body.value.length>0;
    });

    this.loading = false;
    this.successResponse = false;
    this.message = '';
    this.loadingComment = false;

  }

  ngOnInit() {

    this.route.params.subscribe((param) => {
      console.log(JSON.stringify(param));
        this.debateid=param.debateid;

      this.pusher = new Pusher(environment.pusher.key, {
        wsHost:environment.pusher.wsHost,
        wsPort: environment.pusher.wsPort,
        //cluster: 'eu',
        forceTLS: false
      });

      this.commentsChannel = this.pusher.subscribe('chat.'+this.debateid);
      this.udatedCommentsChannel = this.pusher.subscribe('chat.' + this.debateid);

      this.commentsChannel.bind('new-comment', data => {

        console.log("NEW-COMMENT: " + JSON.stringify(this.comments));

        if (!(environment.userdescriptor.userDetails.userid === data.message.authorid)){
          data.message.files = this.transformeToArray(data.message.files);
          this.comments.push(data.message);
        } else{
          let trouvee:boolean = false;
          for (let c of this.comments){
            if (c.commentid === data.message.commentid){
              c.sent = true;
              trouvee = true;
              break;
            }
          }
          if (!trouvee){
            data.message.sent = true;
            data.message.files = this.transformeToArray(data.message.files);
            this.comments.push(data.message);
          }
        }


        this.body.setValue(' ');

        //console.log("NEW-COMMENT: " + JSON.stringify(this.comments));
      });

      this.udatedCommentsChannel.bind('updated-comment', data => {
        /*if (!(environment.userdescriptor.userDetails.userid === data.message.authorid)){
          this.comments.push(data.message);
        } else{*/
          let trouvee:boolean = false;
          for (let c of this.comments){
            if (c.commentid === data.message.commentid){
              c.files = this.transformeToArray(data.message.files);
              c.sent = true;
              console.log("TROVATO AT : " + c.commentid);
              console.log('\n\ndata.message: ' + JSON.stringify(data.message) + '\n\n');
              trouvee = true;
              break;
            }
          }
          if (!trouvee){
            data.message.sent = true;
            this.comments.push(data.message);
          }
        //}
        console.log("UPDATE-COMMENT: " + JSON.stringify(this.comments));
      });

      this.loading = true;
      this.successResponse = false;
      this.message = '';
      this.http.get(forumRootUrl + 'debates/' + this.debateid + '?scope=USER', {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token)
      }).subscribe(res=>{
        let response = JSON.parse(JSON.stringify(res));
        this.title = response.response.theme;
        this.loading = false;
      },error=>{
        this.loading = false;
      }, ()=>{
        this.loading = false;
      });

      }
    );

    this.loading = true;
    this.successResponse = false;
    this.message = '';
    this.observable = this.http.get(forumRootUrl + 'debates/' + this.debateid + '/comments?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.debate=response.response.debate;
          this.defined = !(this.debate===null);

          this.comments = response.response.comments;
          for (let c of  this.comments){
            c.files = this.transformeToArray(c.files);
          }
          this.successResponse = true;
          this.message = '';
        }else {
          this.defined = true;
          this.successResponse = false;
          this.message = response.raison;
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

  }

  posteComment() {

  if (!(this.body.value.trim() === '')){

    /*['commentid', 'debateid', 'authorid', 'authoremail', 'authorname', 'textbody', 'files', 'latitude',
      'longitude']*/

    let uuid = crypto.randomUUID();
    this.commentid.setValue(uuid); //new UntypedFormControl(crypto.randomUUID(), Validators.required);
    let newComment = {
      commentid:this.commentid.value, debateid:this.debateid, authorid:environment.userdescriptor.userDetails.userid, authoremail:environment.userdescriptor.userDetails.email,
      authorname:environment.userdescriptor.userDetails.firstname + '  ' + environment.userdescriptor.userDetails.lastname, textbody:this.body.value,
      latitude:geoPosition.latitude, longitude:geoPosition.longitude, sent:false, time:(new Date()).getTime()
    };

    this.comments.push(newComment);

    this.loadingComment = true;
    this.observable = this.http.post(forumRootUrl + 'debates/' + this.debateid + '/comments?scope=USER', this.commentFormGroup.value, {
      'headers': new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params': this.commentFormGroup.value
    });

    this.observable.subscribe(response => {

        console.log(JSON.stringify(response));


        this.body.setValue(' ');

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {

        } else {
          this.defined = true;
        }

        this.loadingComment = false;

      }, error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        this.loadingComment = false;
      },
      () => {

      this.loadingComment = false;
      });
  }
  }

  displayNone():string{
    return 'none';
  }

  public handleScroll(event: ScrollEvent) {
    //console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      //console.log(`the user is reaching the bottom`);
      this.debatetheme.nativeElement.setAttribute('style','position:fixed; top:75px;')
    }
    if (event.isReachingTop) {
      //console.log(`the user is reaching the top`);
      this.debatetheme.nativeElement.setAttribute('style','position:fixed; top:140px;')
    }
    if (event.isWindowEvent) {
      //console.log(`This event is fired on Window not on an element.`);
    }

  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }


  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      //this.applicationFormGroup.get('photo').setValue(this.file);
      //this.applicationFormGroup.get('photo').setValue(this.file.name);
      //this.fileInformation = null;
      this.filename.setValue(this.file.name);
      console.log('FILE.SIZE = ' + this.file.size);
    }
  }

  openUploadDialog() {

    const dialogConfig = new MatDialogConfig();

    /*dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;*/

    //if (!(this.body.value.trim() === '')){

      /*['commentid', 'debateid', 'authorid', 'authoremail', 'authorname', 'textbody', 'files', 'latitude',
        'longitude']*/

      let uuid = crypto.randomUUID();
      this.commentid.setValue(uuid); //new UntypedFormControl(crypto.randomUUID(), Validators.required);
      let newComment = {
        commentid:this.commentid.value, debateid:this.debateid, authorid:environment.userdescriptor.userDetails.userid, authoremail:environment.userdescriptor.userDetails.email,
        authorname:environment.userdescriptor.userDetails.firstname + '  ' + environment.userdescriptor.userDetails.lastname, textbody:this.body.value.trim(), files: [],
        latitude:geoPosition.latitude, longitude:geoPosition.longitude, sent:false, time:(new Date()).getTime()
      };

    /*dialogConfig.data = {
      url:'http://localhost:8001/api/debates/' + this.debateid + '/comments-with-file',
      comment:newComment,
      debate:this.debate

    };*/

    //this.dialog.open(MemberDialogComponent, dialogConfig);

    //const dialogRef = this.dialog.open(MemberDialogComponent, dialogConfig);


    console.log("Comment on open: " + JSON.stringify(newComment));
    let dialogRef = this.dialog.open(UploadDialogComponent, { width: '40%', height: '60%' ,
      data:{url: forumRootUrl + 'debates/' + this.debateid + '/comments-with-file?scope=USER',comment:newComment,
        debate:this.debate}
    });
  }

  transformeToArray(str:string):Array<any>{

    try {
      //console.log('str: ' + str);
      return JSON.parse(str);

    }catch (e) {
      //console.log('Error: ' + JSON.stringify(e.message));
      return [];
    }
  }

  extractFile(file:string):string{
    let arrayObtained = file.split('/');
    if (arrayObtained.length === 0) return '';
    return arrayObtained[arrayObtained.length - 1];
  }


  popupFile(commentid, file) {

    const dialogConfig = new MatDialogConfig();

    /*dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;*/

    //if (!(this.body.value.trim() === '')){

    /*['commentid', 'debateid', 'authorid', 'authoremail', 'authorname', 'textbody', 'files', 'latitude',
      'longitude']*/

    /*let uuid = crypto.randomUUID();
    this.commentid.setValue(uuid); //new UntypedFormControl(crypto.randomUUID(), Validators.required);
    let newComment = {
      commentid:this.commentid.value, debateid:this.debateid, authorid:environment.userdescriptor.userDetails.userid, authoremail:environment.userdescriptor.userDetails.email,
      authorname:environment.userdescriptor.userDetails.firstname + '  ' + environment.userdescriptor.userDetails.lastname, textbody:this.body.value.trim(),
      latitude:geoPosition.latitude, longitude:geoPosition.longitude, sent:false, time:(new Date()).getTime()
    };*/

    /*dialogConfig.data = {
      url:'http://localhost:8001/api/debates/' + this.debateid + '/comments-with-file',
      comment:newComment,
      debate:this.debate

    };*/

    //this.dialog.open(MemberDialogComponent, dialogConfig);

    //const dialogRef = this.dialog.open(MemberDialogComponent, dialogConfig);


    let dialogRef = this.dialog.open(ShowFileDialogComponent, { width: '90%', height: '90%' ,
      data:{url:forumRootUrl + 'debates/' + this.debateid + '/comments/' + commentid + '/file?file=' + this.extractFile(file)}
    });
  }

}
