import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UntypedFormBuilder} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {countries, geoPosition, idRootUrl} from '../../Constants';
import {appStore} from '../../store/AppStore';
import {MyResponse} from '../../application/application.component';
import {ApplicationsResponse} from '../../domain/model/ApplicationsResponse';
import {ADD_APPLICATIONS_RESPONSE, AddApplicationsResponseAction} from '../../action/applications-response-action';

@Component({
  standalone: false,
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {

  applicationid:string;

  application:any;
  applicationfound : boolean;
  loading = false;


  //http://localhost:8000/api/users

  application_img:any;

  actionReturnString:string;
  actionReturnFailed:boolean;
  private message: any;
  private photoUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private fb:UntypedFormBuilder) {}


  ngOnInit() {

    this.route.params.subscribe((param) => {
        //console.log(JSON.stringify(param));
        this.applicationid=param.applicationid;
        let applications = appStore.getState().applications.applications;

      //console.log('appStore.getState().applications ============= ' + JSON.stringify(applications));
      this.application = null;
      this.applicationfound = false;
      for (let i = 0; i<applications.length; i++){
        if (applications[i].applicationid === this.applicationid){
          this.application = applications[i];
          break;
        }
      }

      this.applicationfound = this.application !== null;

      if (this.applicationfound){
        this.message = '';
        /*this.httpClient.get('http://localhost:8000/api/applications/'+this.applicationid+'/photo?scope=USER', {
          'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
            .set('Authorization', 'Bearer ' + environment.oauth_client.token)
        }).subscribe((response)=>{

            this.application_img = response;

            //console.log("IMG = " + response);

          },error => {
            //this.loginResponse = new LoginResponse(0, 1, null, error.error);
            //this.message = this.loginResponse.raison;
          },
          () => {

          });*/
        this.photoUrl = idRootUrl + 'applications/'+this.applicationid+'/photo';
      }else{
        this.message = 'Erreur: Aucune demande reference par ' + this.applicationid;
      }

      }
    );
  }

  acceptThisApplication(){

    this.actionReturnFailed = true;
    this.actionReturnString = '';
    this.loading = true;
    this.httpClient.post(idRootUrl + 'applications/'+this.applicationid+'?scope=ADMINISTRATOR&action=APPLICATION_ACCEPTED', {
      //action:'APPLICATION_ACCEPTED',

    },{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), params:{
        action:'APPLICATION_ACCEPTED',
      }
    }).subscribe((response:MyResponse)=>{

      if (response.success === 1 && response.faillure === 0){
        this.actionReturnString = response.response;
        this.actionReturnFailed = false;
      } else {
        this.actionReturnString = response.raison;
        this.actionReturnFailed = true;
      }


        //console.log("actionReturnString = " + response);
        this.loading = false;


      },error => {
        this.actionReturnString = JSON.stringify(error);
        this.actionReturnFailed = true;

        this.loading = false;
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      },
      () => {
        this.loading = false;
      });
  }

  refuseThisApplication(){

    this.actionReturnFailed = true;
    this.actionReturnString = '';
    this.loading = true;
    this.httpClient.post(idRootUrl + 'applications/'+this.applicationid+'?scope=ADMINISTRATOR&action=APPLICATION_DENIED', {
      //action:'APPLICATION_DENIED',

    },{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), params:{
        action:'APPLICATION_DENIED',
      }
    }).subscribe((response:MyResponse)=>{

        if (response.success === 1 && response.faillure === 0){
          this.actionReturnString = response.response;
          this.actionReturnFailed = false;
        } else {
          this.actionReturnString = response.raison;
          this.actionReturnFailed = true;
        }

        //console.log("actionReturnString = " + JSON.stringify(response));
        this.loading = false;

      },error => {
        this.actionReturnString = JSON.stringify(error);
        this.actionReturnFailed = true;

        this.loading = false;
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      },
      () => {
        this.loading = false;
      });
  }

  applicationImgUrl():string{
    return idRootUrl + 'applications/'+this.applicationid+'/photo?scope=ADMINISTRATOR';
  }

  getCountryName(user:any):string {
    for (let country of countries){
      if (country.code === user.country){
        return country.name;
      }
    }
    return '';
  }

}
