import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {countries} from '../Constants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {MemberDialogComponent} from './member-dialog/member-dialog.component';


@Component({
  selector: 'app-revoke-member',
  templateUrl: './revoke-member.component.html',
  styleUrls: ['./revoke-member.component.css']
})
export class RevokeMemberComponent implements OnInit {


  members:Array<any>;
  private observable: Observable<any>;

  loading = false;

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    this.members = [];
  }

  ngOnInit() {

    console.log("token: \n\n" + environment.oauth_client.token + "\n\n");

    this.loading = true;
    this.observable = this.httpClient.get('http://localhost:8000/api/members', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.members = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.members.push(reponse[i]);
          }
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

  getCountryName(user:any):string {
    for (let country of countries){
      if (country.code === user.country){
        return country.name;
      }
    }
    return '';
  }

  openDialog(user:any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      user:user
    };

    //this.dialog.open(MemberDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(MemberDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
    dialogRef.afterOpened().subscribe(result=>{
      console.log(`Dialog result: ${result}`);
    });
  }

}



