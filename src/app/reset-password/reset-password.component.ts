import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordFormGroup: FormGroup;
  newpassword: FormControl;
  newpassword_confirmation: FormControl;


  error:boolean = false;
  message:string = '';
  loading = false;
  successResponse:boolean = false;

  email:string;
  invitationid:string;

  observable:Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private http:HttpClient, private loginService: LoginService, private fb:FormBuilder) {

    this.newpassword = new FormControl('', [Validators.required]);
    this.newpassword_confirmation = new FormControl('', [Validators.required]);

    this.resetPasswordFormGroup = fb.group({
      newpassword:this.newpassword,
      newpassword_confirmation:this.newpassword_confirmation
    });

  }


  ngOnInit() {

    this.route.params.subscribe(param => {
      this.email = param.email;
      this.invitationid = param.invitationid;
    });

  }

  submit() {
    this.error = false;
    this.message = '';
    if (this.resetPasswordFormGroup.valid) {
      this.loading = true;
      console.log('submited');
      this.successResponse = false;
      this.message= '';
      this.observable = this.http.post('http://localhost:8000/api/users/' + this.email + '/password-reset/' + this.invitationid, {}, {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json'),
        'params':this.resetPasswordFormGroup.value
      });
      this.observable.subscribe(
        res => {

          console.log(JSON.stringify(res));

          let success: number = res.success;
          let faillure: number = res.faillure;
          if (success === 1 && faillure === 0) {
            this.message = res.response;
            this.successResponse = true;
            this.resetPasswordFormGroup.reset();
          }else {
            this.message = res.raison;
            this.successResponse = false;
          }
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
          this.message = error.statusText;
          this.successResponse = false;
        },
        () => {
          this.loading = false;
        }
      );


    }else{
      console.log('invalide form');
    }
  }

}
