import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MyResponse} from '../application/application.component';
import {ADD_APPLICATIONS_RESPONSE, AddApplicationsResponseAction} from '../action/applications-response-action';
import {ApplicationsResponse} from '../domain/model/ApplicationsResponse';
import {appStore} from '../store/AppStore';
import {Action} from 'rxjs/internal/scheduler/Action';
import {Router} from '@angular/router';
import {countries, idRootUrl} from '../Constants';

export interface Application {
  id:number;
  applicationid:string;
  firstname:string;
  lastname:string;
  gender:string;
  photo:string;
  country:string;
  cityofresidency:string;
  interestcenter:string;
  email:string;
  phone:string;
  commenttotheregistration:string;
  state:string;
  latitude:number;
  longitude:number;
  created_at:string;
  updated_at:string;
}
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  idRootUrl:string = idRootUrl;
  applications:Array<Application>;
  loading:boolean;
  successResponse:boolean;
  message:string;

  constructor(private httpClient:HttpClient, private  router:Router) {
    this.loading = false;
    this.successResponse = false;
    this.message= '';
  }

  ngOnInit() {

    this.loading = true;
    this.successResponse = false;
    this.message= '';
    this.httpClient.get(idRootUrl + 'applications?scope=ADMINISTRATOR', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    }).subscribe((response:MyResponse)=>{

        //console.log('applications: ' + JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.applications = response.response;
          let applicationsResponse : ApplicationsResponse = <ApplicationsResponse>response;

          let applicationsResponseAction:AddApplicationsResponseAction={
            type:ADD_APPLICATIONS_RESPONSE, applicationsResponse:applicationsResponse
          };

          appStore.dispatch(applicationsResponseAction);

          this.successResponse = true;
          this.message = '';

          /*let reponse = response.response;
          for (let i=0; i<reponse.length; i++){
            this.debates.push(reponse[i]);
          }*/
        }else{
          this.message = response.raison;
          this.successResponse = false;
        }

        this.loading = false;

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        this.message = error.statusText;
        this.successResponse = false;
        this.loading = false;

      },
      () => {

      });

  }

  gotoFiche(applicationid:string){
    this.router.navigate(['fiche' ,applicationid]);
  }

  getCountryName(application:any):string {
    for (let country of countries){
      if (country.code === application.country){
        return country.name;
      }
    }
    return '';
  }

}
