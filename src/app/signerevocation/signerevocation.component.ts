import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {countries, idRootUrl} from '../Constants';

@Component({
  selector: 'app-signerevocation',
  templateUrl: './signerevocation.component.html',
  styleUrls: ['./signerevocation.component.css']
})
export class SignerevocationComponent implements OnInit {

  idRootUrl:string = idRootUrl;

  revocationPropositions:Array<any>;
  observable: Observable<any>;

  loading = false;

  error:boolean = false;
  message:string = '';
  messageStyle:any = {};

  constructor(private httpClient: HttpClient) {
    this.revocationPropositions = [];
  }

  ngOnInit() {

    //console.log("Token: \n\n" + environment.oauth_client.token + "\n\n");

    this.loading = true;
    this.observable = this.httpClient.get(idRootUrl + 'userrevokationpropositions-created?scope=ADMINISTRATOR', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });

    this.observable.subscribe(response=>{

        //console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.revocationPropositions = new Array<any>();
          let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.revocationPropositions.push(reponse[i]);
          }

          //environment.revocationPropositions = this.revocationPropositions;
        }

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
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

  getSignataire(json:string):Array<any>{
    return JSON.parse(json);
  }

  signerRevocationProposition(userrevokationpropositionid:string):void{

    //console.log("userrevokationpropositionid : " + userrevokationpropositionid);

    this.loading = true;
    this.error = false;
    this.message = '';
    this.httpClient.post(idRootUrl + 'userrevokationpropositions/' + userrevokationpropositionid + '?scope=ADMINISTRATOR', {},{
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
        if (!this.error){
          this.ngOnInit();
        }

      });

  }

  closeAlert() {
    /*if (this.error){
      this.error = !this.error;
    }*/

    this.messageStyle = {
      'display':'none'
    };

    //console.log('close call');
  }

}
