import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {geoPosition} from '../Constants';
import {LoginService} from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  email: FormControl;
  password: FormControl;
  grant_type: FormControl;
  client_id: FormControl;
  client_secret: FormControl;
  refresh_token: FormControl;

  error:boolean = false;
  message:string = '';

  color = 'primary';
  mode = 'determinate';
  value = 50;
  loading = false;
  label = 'Veuillez patienter s\'il vous plait';


  oldEmail: string = '';

  observable:Observable<any>;

  latitude: FormControl;
  longitude: FormControl;
  watchID:any;

  constructor(private router: Router, private route: ActivatedRoute, private http:HttpClient, private loginService: LoginService) {}

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
      console.log("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
    }

  }

  submit() {
    this.error = false;
    this.message = '';
    if (this.loginFormGroup.valid) {
      this.loading = true;
      console.log('submited');
      /*let mesoption = [{
        key: 'headers', value: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + 'long token here')
      }, {key: 'cle', value: 'valeur'}, {key: 'params', value: this.loginFormGroup.value}];*/

      this.observable = this.http.post('http://localhost:8000/api/users/login', this.loginFormGroup.value, {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + 'long token here'),
        'params':this.loginFormGroup.value
      });
      this.observable.subscribe(
        res => {

          console.log(JSON.stringify(res));

          let success: number = res.success;
          let faillure: number = res.faillure;
          if (success === 1 && faillure === 0) {
            //this.loading = true;
            let token: string = res.token.access_token;
            environment.oauth_client.token = token;

            console.log(token);

            environment.userdescriptor = res.response;
            this.loginService.toggle();

            this.router.navigate(['/debates'], {relativeTo: this.route.parent});

            /*localStorage.setItem('userdescriptor', JSON.stringify(environment.userdescriptor));

            this.grant_type = new FormControl(environment.debate_oauth_client.grant_type);
            this.client_id = new FormControl(environment.debate_oauth_client.client_id);
            this.client_secret = new FormControl(environment.debate_oauth_client.client_secret);

            this.loginFormGroup = new FormGroup({
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
        },
        () => {
          this.loading = false;
          this.password.setValue('');
        }
      );


    }else{
      console.log('invalide form');
    }
  }

  init(){
    this.grant_type = new FormControl(environment.oauth_client.grant_type);
    this.client_id = new FormControl(environment.oauth_client.client_id);
    this.client_secret = new FormControl(environment.oauth_client.client_secret);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.latitude = new FormControl('0', Validators.required);
    this.longitude = new FormControl('0', Validators.required);

    this.loginFormGroup = new FormGroup({
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

