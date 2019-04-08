import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login.service';
import {geoPosition, idRootUrl} from '../Constants';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  passwordResetRequestFormGroup: FormGroup;
  email: FormControl;

  error:boolean = false;
  message:string = '';
  loading = false;

  observable:Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private http:HttpClient, private loginService: LoginService, private fb:FormBuilder) {

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.passwordResetRequestFormGroup = fb.group({
      email:this.email
    });

  }


  ngOnInit() {

    this.route.params.subscribe(param => console.log(JSON.stringify(param)));

  }

  submit() {
    this.error = false;
    this.message = '';
    if (this.passwordResetRequestFormGroup.valid) {
      this.loading = true;
      //console.log('submited');
      /*let mesoption = [{
        key: 'headers', value: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + 'long token here')
      }, {key: 'cle', value: 'valeur'}, {key: 'params', value: this.loginFormGroup.value}];*/

      this.observable = this.http.post(idRootUrl + 'users/' + this.email.value + '/password-reset-request', {}, {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        //'params':this.passwordResetRequestFormGroup.value
      });
      this.observable.subscribe(
        res => {

          //console.log(JSON.stringify(res));

          let success: number = res.success;
          let faillure: number = res.faillure;
          if (success === 1 && faillure === 0) {

          }
        },
        error => {
          this.error = true;
          this.loading = false;
        },
        () => {
            this.loading = false;
        }
      );


    }else{
      //console.log('invalide form');
    }
  }

}
