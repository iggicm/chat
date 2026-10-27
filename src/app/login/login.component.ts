import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {geoPosition, idRootUrl} from '../Constants';
import {LoginService} from '../login.service';
import {ToastrService} from '../shared/notification.service';


@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: UntypedFormGroup;
  email: UntypedFormControl;
  password: UntypedFormControl;
  grant_type: UntypedFormControl;
  client_id: UntypedFormControl;
  client_secret: UntypedFormControl;
  refresh_token: UntypedFormControl;

  error:boolean = false;
  message:string = '';

  color = 'primary';
  mode = 'determinate';
  value = 50;
  loading = false;
  label = 'Veuillez patienter s\'il vous plait';


  oldEmail: string = '';

  observable:Observable<any>;

  latitude: UntypedFormControl;
  longitude: UntypedFormControl;
  watchID:any;

  constructor(private router: Router, private route: ActivatedRoute, private http:HttpClient, private loginService: LoginService, private toastr: ToastrService) {}

  ngOnInit() {

    this.route.params.subscribe(param => console.log(JSON.stringify(param)));

    this.router.navigate(['/debates'], {relativeTo: this.route.parent});

    this.init();

    if (navigator.geolocation) {
      /* géolocalisation possible */
      console.log('navigator.geolocation');
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude.setValue(position.coords.latitude);
        this.longitude.setValue(position.coords.longitude);
        geoPosition.latitude = this.latitude.value;
        geoPosition.longitude = this.longitude.value;
        console.log('latitude: ' + this.latitude.value + ', longitude: ' + this.longitude.value);
      });
      console.log('end.geolocation');


       this.watchID = navigator.geolocation.watchPosition(function(position) {
         geoPosition.latitude = position.coords.latitude;
         geoPosition.longitude = position.coords.longitude;
          //do_something(position.coords.latitude, position.coords.longitude);
        }
      );
    } else {
      this.latitude.setValue(0);
      this.longitude.setValue(0);
      //console.log("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
    }

  }

  submit() {
    this.error = false;
    this.message = '';
    if (this.loginFormGroup.valid) {
      this.loading = true;
      //console.log('submited');
      /*let mesoption = [{
        key: 'headers', value: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + 'long token here')
      }, {key: 'cle', value: 'valeur'}, {key: 'params', value: this.loginFormGroup.value}];*/

      console.log("loginFormGroup", JSON.stringify(this.loginFormGroup.value));

      this.observable = this.http.post(idRootUrl + 'users/login', this.loginFormGroup.value, {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + 'long token here'),
        'params':this.loginFormGroup.value
      });
      this.observable.subscribe(
        res => {

          //console.log(JSON.stringify(res));

          let success: number = res.success;
          let faillure: number = res.faillure;
          if (success === 1 && faillure === 0) {
            //this.loading = true;
            let token: string = res.token.access_token;
            environment.oauth_client.token = token;

            //console.log(token);

            environment.userdescriptor = res.response;
            this.loginService.toggle();

            this.router.navigate(['/debates'], {relativeTo: this.route.parent});

            /*localStorage.setItem('userdescriptor', JSON.stringify(environment.userdescriptor));

            this.grant_type = new UntypedFormControl(environment.debate_oauth_client.grant_type);
            this.client_id = new UntypedFormControl(environment.debate_oauth_client.client_id);
            this.client_secret = new UntypedFormControl(environment.debate_oauth_client.client_secret);

            this.loginFormGroup = new UntypedFormGroup({
              grant_type: this.grant_type,
              client_id: this.client_id,
              client_secret: this.client_secret,
              email: this.email,
              password: this.password
            });

            this.observable = this.http.post('http://localhost:8001/api/members-oauth?scope=USER', this.loginFormGroup.value, {
              'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
                .set('Authorization', 'Bearer ' + token), 'params':this.loginFormGroup.value
            });

            this.observable.subscribe(response=>{

                console.log(JSON.stringify(response));

                let succes: number = response.success;
                let faillite: number = response.faillure;
                if (succes === 1 && faillite === 0) {
                  let tok: string = response.token.access_token;
                  environment.debate_oauth_client.token = tok;

                  this.loginService.toggle();

                  this.router.navigate(['/debates'], {relativeTo: this.route.parent});

                }

              },error => {
                //this.loginResponse = new LoginResponse(0, 1, null, error.error);

                this.error = true;
                //this.message = this.loginResponse.raison;
              },
              () => {
                this.loading = false;
                this.init();
              });*/

          }else{
            this.message = res.raison;
            this.error = true;
            this.toastr.error(res.raison, 'Modification de mot de passe',  {
              timeOut: 10000,
              closeButton: true,
              enableHtml:true,
              positionClass: 'toast-top-full-width'

            });
          }
        },
        error => {
          //this.loginResponse = new LoginResponse(0, 1, null, error.error);

          /*
          {"headers":{"normalizedNames":{},"lazyUpdate":null,"headers":{}},
          "status":0,"statusText":"Unknown Error","url":"http://localhost:8000/api/users/login","ok":false,
          "name":"HttpErrorResponse","message":"Http failure response for http://localhost:8000/api/users/login: 0 Unknown Error","error":{"isTrusted":true}}
           */
          this.error = true;
          this.message = error.statusText;//JSON.stringify(error);
          this.loading = false;

          this.toastr.error(error.statusText, 'Modification de mot de passe',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        },
        () => {
          this.loading = false;
          this.password.setValue('');
        }
      );


    }else{
      //console.log('invalide form');
    }
  }

  init(){
    this.grant_type = new UntypedFormControl(environment.oauth_client.grant_type);
    this.client_id = new UntypedFormControl(environment.oauth_client.client_id);
    this.client_secret = new UntypedFormControl(environment.oauth_client.client_secret);
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.password = new UntypedFormControl('', Validators.required);
    this.latitude = new UntypedFormControl('0', Validators.required);
    this.longitude = new UntypedFormControl('0', Validators.required);

    this.loginFormGroup = new UntypedFormGroup({
      grant_type: this.grant_type,
      client_id: this.client_id,
      client_secret: this.client_secret,
      email: this.email,
      password: this.password,
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }

  displayNone():string{
    return 'none';
  }


}

