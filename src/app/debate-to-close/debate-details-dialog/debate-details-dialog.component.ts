import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {forumRootUrl, geoPosition} from '../../Constants';
import {UploadDialogComponent} from '../../upload-dialog/upload-dialog.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-debate-details-dialog',
  templateUrl: './debate-details-dialog.component.html',
  styleUrls: ['./debate-details-dialog.component.css']
})
export class DebateDetailsDialogComponent implements OnInit {

  data:any;
  debate:any;

  successResponse:boolean;
  loading: boolean;
  message: string;

  comments: Array<any>;
  files: Array<string>;

  constructor(public dialogRef: MatDialogRef<DebateDetailsDialogComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data: any, private fb: FormBuilder) {
    this.data = data;
    this.debate = data.debate;
    this.comments = [];
    this.files = [];
  }

  ngOnInit() {

    this.loading = true;
    this.message = '';
    this.successResponse = false;
    this.http.get(forumRootUrl + 'debates/'+this.debate.debateid+'/comments?scope=USER', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    }).subscribe((response:any)=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.comments = response.response.comments;
          if (this.comments.length === 0){
            this.message = 'Aucun commentaire trouve';
            this.successResponse = false;
          } else{
            this.successResponse = true;
            this.files = [];
            for (let c of this.comments){
              let fichiers = this.transformeToArray(c.files);
              for (let f of fichiers){
                this.files.push(f);
              }
            }
          }
        }else{
          this.message = response.raison;
          this.successResponse = false;
        }

        this.loading = false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        this.message = error.statusText;
        this.loading = false;
        this.successResponse = false;
      },
      () => {
        this.loading = false;
      });

  }


  closeDialog() {

    return this.dialogRef.close();

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

}
