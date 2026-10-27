import { Component, OnInit } from '@angular/core';
/*import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';*/

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

export interface IImage {
  url: string | null;
  href?: string;
  clickAction?: Function;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

// @ts-ignore
@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  height = '100px';
  imgUrl:string = location.href;
  imageSources:  (string | IImage)[] = [
    /*{ url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: '../../assets/carousel/slide1.png' },
    'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',*/
    { url: this.imgUrl + '/../assets/carousel/slide1.png' , href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') },
    { url: this.imgUrl +'/../assets/carousel/slide1.png' ,  href: this.imgUrl +'/../assets/carousel/slide1.png' , clickAction: () => alert('custom click function') }
  ];

  /*loginFormGroup: UntypedFormGroup;
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

  observable:Observable<any>;*/

  constructor(/*private router: Router, private route: ActivatedRoute, private http:HttpClient*/) {

  }


  ngOnInit() {

    //this.route.params.subscribe(param => console.log(JSON.stringify(param)));

    //this.init();

  }

  /*submit() {
    this.error = false;
    this.message = '';
    if (this.loginFormGroup.valid) {
      this.loading = true;
      console.log('submited');
      /!*let mesoption = [{
        key: 'headers', value: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' + 'long token here')
      }, {key: 'cle', value: 'valeur'}, {key: 'params', value: this.loginFormGroup.value}];*!/

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
            let token: string = res.token.access_token;
            environment.oauth_client.token = token;

            console.log(token);

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
              });

          }
        },
        error => {
          //this.loginResponse = new LoginResponse(0, 1, null, error.error);

          this.error = true;
          //this.message = this.loginResponse.raison;
        },
        () => {
          this.loading = false;
          this.init();
        }
      );


    }else{
      console.log('invalide form');
    }
  }

  init(){
    this.grant_type = new UntypedFormControl(environment.oauth_client.grant_type);
    this.client_id = new UntypedFormControl(environment.oauth_client.client_id);
    this.client_secret = new UntypedFormControl(environment.oauth_client.client_secret);
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.password = new UntypedFormControl('', Validators.required);

    this.loginFormGroup = new UntypedFormGroup({
      grant_type: this.grant_type,
      client_id: this.client_id,
      client_secret: this.client_secret,
      email: this.email,
      password: this.password
    });
  }
*/
}
