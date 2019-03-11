import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {appStore} from '../../store/AppStore';
import {countries} from '../../Constants';

@Component({
  selector: 'app-debate-moderator-candidature',
  templateUrl: './debate-moderator-candidature.component.html',
  styleUrls: ['./debate-moderator-candidature.component.css']
})
export class DebateModeratorCandidatureComponent implements OnInit {

  candidatures: Array<any>;

  observable: Observable<any>;

  debateid:string;

  debateTheme: string;
  debate:any;
  loading:boolean;
  responseSuccess:boolean;
  message:string;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.loading = false;
  }

  ngOnInit() {


    this.loading = false;
    this.route.params.subscribe((param) => {
        console.log(JSON.stringify(param));
        this.debateid=param.debateid;

        console.log('debateid ============= ' + this.debateid);

        //Route::get('debates/{debateid}/candidatures', 'DebatesController@getDebateCandidature')->middleware(['auth:api']);
      this.loading = true;
      this.observable = this.httpClient.get('http://localhost:8001/api/debates/'+this.debateid+'/candidatures?scope=ADMINISTRATOR', {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token)
      });
      this.observable.subscribe(response=>{

          console.log(JSON.stringify(response));

          let succes: number = response.success;
          let faillite: number = response.faillure;
          if (succes === 1 && faillite === 0) {
            this.candidatures = new Array<any>();
            let reponse = response.response;
            for (let i=0; i<reponse.length; i++){
              this.candidatures.push(reponse[i]);
                let signatures = JSON.parse(reponse[i].administratorssignatures);
                let hasYetSigned = false;
                for (let signature of signatures){
                  if (signature.administator_id == environment.userdescriptor.userDetails.userid){
                    this.candidatures[i].hasYetSigned = true;
                    hasYetSigned = true;
                    break;
                  }
                }

                if (!hasYetSigned){
                  this.candidatures[i].hasYetSigned = false;
                }

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
    );


    this.observable = this.httpClient.get('http://localhost:8001/api/debates/'+this.debateid+'?scope=ADMINISTRATOR', {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    });
    this.observable.subscribe(response=>{

        console.log(JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          let reponse = response.response;
          this.debate = reponse;
          this.debateTheme = reponse.theme;
        }

      },error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
        //this.loading = false;
      },
      () => {

      });


  }

  userImgUrl():string{
    return 'http://localhost:8000/api/users/'+environment.userdescriptor.userDetails.userid+'/photo';
  }

  candidatureImgUrl(userid:string):string{
    return 'http://localhost:8000/api/users/'+userid+'/photo';

  }

  accepterCandidature(candidatureid:string){

    //Route::post('debates/{debateid}/candidatures/{candidatureid}', 'DebatesController@makeDecisionOnCandidature')->middleware(['auth:api']);
    this.loading = true;
    this.responseSuccess = true;
    this.message = '';

    this.httpClient.post('http://localhost:8001/api/debates/'+this.debateid+'/candidatures/'+candidatureid+'?scope=ADMINISTRATOR', {}, {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' +  environment.oauth_client.token),
      'params':{
        action:'SIGN'
      }
    }).subscribe(res=>{

      console.log(JSON.stringify(res));

      this.observable = this.httpClient.get('http://localhost:8001/api/debates/'+this.debateid+'/candidatures?scope=ADMINISTRATOR', {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token)
      });
      this.observable.subscribe(response=>{

          console.log(JSON.stringify(response));

          let succes: number = response.success;
          let faillite: number = response.faillure;
          if (succes === 1 && faillite === 0) {
            this.candidatures = new Array<any>();
            let reponse = response.response;
            for (let i=0; i<reponse.length; i++){
              this.candidatures.push(reponse[i]);
              let signatures = JSON.parse(reponse[i].administratorssignatures);
              let hasYetSigned = false;
              for (let signature of signatures){
                if (signature.administator_id == environment.userdescriptor.userDetails.userid){
                  this.candidatures[i].hasYetSigned = true;
                  hasYetSigned = true;
                  break;
                }
              }

              if (!hasYetSigned){
                this.candidatures[i].hasYetSigned = false;
              }

            }

            this.loading = false;
            this.responseSuccess = true;
            this.message = 'Candidature acceptee avec succes';
          }else{
            this.loading = false;

            this.responseSuccess = false;
            this.message = response.raison;
          }

        },error => {
          //this.loginResponse = new LoginResponse(0, 1, null, error.error);
          //this.message = this.loginResponse.raison;
          this.loading = false;
          this.responseSuccess = false;
          this.message = error.statusText;
        },
        () => {
          this.loading = false;
        });


    }, error=>{

      console.log(JSON.stringify(error));
      this.loading = false;
      this.responseSuccess = false;
      this.message = error.statusText;
    },()=>{

    });

  }

  retirerVote(candidatureid:string){

    this.loading = true;
    this.message = '';
    this.responseSuccess = false;
    this.httpClient.post('http://localhost:8001/api/debates/'+this.debateid+'/candidatures/'+candidatureid+'?scope=ADMINISTRATOR', {}, {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' +  environment.oauth_client.token),
      'params':{
        action:'UNSIGN'
      }
    }).subscribe(res=>{
      console.log(JSON.stringify(res));
      this.observable = this.httpClient.get('http://localhost:8001/api/debates/'+this.debateid+'/candidatures?scope=ADMINISTRATOR', {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + environment.oauth_client.token)
      });
      this.observable.subscribe(response=>{

          console.log(JSON.stringify(response));

          let succes: number = response.success;
          let faillite: number = response.faillure;
          if (succes === 1 && faillite === 0) {
            this.candidatures = new Array<any>();
            let reponse = response.response;
            for (let i=0; i<reponse.length; i++){
              this.candidatures.push(reponse[i]);
              let signatures = JSON.parse(reponse[i].administratorssignatures);
              let hasYetSigned = false;
              for (let signature of signatures){
                if (signature.administator_id == environment.userdescriptor.userDetails.userid){
                  this.candidatures[i].hasYetSigned = true;
                  hasYetSigned = true;
                  break;
                }
              }

              if (!hasYetSigned){
                this.candidatures[i].hasYetSigned = false;
              }

            }

            this.loading = false;
            this.responseSuccess = true;
            this.message = 'Candidature acceptee avec succes';
          }else{
            this.loading = false;

            this.responseSuccess = false;
            this.message = response.raison;
          }

        },error => {
          //this.loginResponse = new LoginResponse(0, 1, null, error.error);
          //this.message = this.loginResponse.raison;
          this.loading = false;
          this.responseSuccess = false;
          this.message = error.statusText;
        },
        () => {
          this.loading = false;
        });

    }, error=>{

      console.log(JSON.stringify(error));
      this.loading = false;
      this.responseSuccess = false;
      this.message = error.statusText;

    },()=>{

    });
  }

  //getCountryName

  getCountryName(user:any):string {
    for (let country of countries){
      if (country.code === user.country){
        return country.name;
      }
    }
    return '';
  }
}
