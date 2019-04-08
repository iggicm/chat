import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {countries, idRootUrl} from '../../Constants';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css']
})
export class MemberDialogComponent implements OnInit {

  data:any;
  loading = false;
  error:boolean = false;
  message:string = '';
  idRootUrl:string = idRootUrl;


  constructor(private dialogRef: MatDialogRef<MemberDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private httpClient:HttpClient) {

    //console.log("dialog user: " + JSON.stringify(data));

    this.data = data;

  }

  ngOnInit() {

    //console.log("dialog user: " + JSON.stringify(this.data));

  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }


  getCountryName(user:any):string {
    for (let country of countries){
      if (country.code === user.country){
        return country.name;
      }
    }
    return '';
  }

  getAceptedBy(accepted_by:string):string{
    if (environment.userdescriptor.userDetails.userid === accepted_by){
      return environment.userdescriptor.userDetails.firstname + '  ' + environment.userdescriptor.userDetails.lastname;
    }

    for (let u of environment.users){
      if (u.userid === accepted_by){
        return u.firstname + '  ' + u.lastname;
      }
    }

    return '';
  }

  revokeUser(userid:string){
    //console.log("userid : " + userid);

    this.loading = true;
    this.error = false;
    this.message = '';
    this.httpClient.post(idRootUrl + 'revokedusers/' + userid + '', {},{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params':{}
    }).subscribe((response:any)=>{

        //console.log('applications: ' + JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;

        this.error = !(succes === 1 && faillite === 0);
        if (this.error){
          this.message = response.raison;
        } else {
          this.message = response.response;
        }

      },error => {

      this.message = JSON.stringify(error);
        this.loading = false;

      },
      () => {
        this.loading = false;
        //console.log('navigationnnnnnnnnnn');
        //this.ngOnInit();
        //document.location.reload();

        //setTimeout(function(){ this.close(); }, 7000);

      });

  }

  closeAlert() {
    if (this.error){
      this.error = !this.error;
    }

    //console.log('close call');
  }

}
