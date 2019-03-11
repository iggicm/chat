import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MyResponse} from '../../application/application.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-suggestdebate',
  templateUrl: './suggestdebate.component.html',
  styleUrls: ['./suggestdebate.component.css']
})
export class SuggestdebateComponent implements OnInit {
  loading = false;
  successResponse:boolean;
  suggestDebateFormGroup:FormGroup;

  interestcenter: FormControl;
  theme:FormControl;
  interestcenters:any[];


  error:boolean = false;
  message:string = '';
  constructor(private httpClient:HttpClient, private fb:FormBuilder) {
    this.loading = false;
    this.createControls();
    this.suggestDebateFormGroup = this.fb.group({
      theme:this.theme,
      interestcenter:this.interestcenter,
      authorid:new FormControl(environment.userdescriptor.userDetails.userid, Validators.required),
      authoremail:new FormControl(environment.userdescriptor.userDetails.email, Validators.required),
      authorname:new FormControl(environment.userdescriptor.userDetails.firstname + '  ' + environment.userdescriptor.userDetails.firstname, Validators.required),
      interestcentername:new FormControl('', Validators.required),
      interestcenterdescription:new FormControl('', Validators.required)
    })

  }
//this.userId = environment.userdescriptor.userDetails.userid;//999;
  ngOnInit() {


    console.log('Token: ' + environment.oauth_client.token);

    this.loading = true;
    this.message = '';
    this.successResponse = false;
    this.httpClient.get('http://localhost:8001/api/interestcenters?scope=USER',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json') .set('Authorization', 'Bearer ' + environment.oauth_client.token)
    }).subscribe((res:MyResponse)=>{
      console.log(JSON.stringify(res));
      //{"success":1,"faillure":0,"response":[{"id":1,"interestcenterid":"5672b0af-2dcf-11e9-8c50-ac2b6ee888a2","name":"Sante Marternel",
      // "description":"Sante Marternel","created_at":"2019-02-11 08:33:34","updated_at":"2019-02-11 08:33:34"},{"id":2,"interestcenterid":"8df2f96b-2dcf-11e9-8c50-ac2b6ee888a2","name":"Agriculture Marechere","description":"Agriculture Marechere","created_at":"2019-02-11 08:35:07","updated_at":"2019-02-11 08:35:07"}]}
      let response:Array<any> = res.response;
      this.interestcenters = [];
      for (let a=0; a<response.length; a++){
        this.interestcenters.push(response[a]);
      }
      this.message = '';
      this.loading = false;
      this.successResponse = true;

    },error=>{


      this.successResponse = false;

      this.message = error.statusText;

      this.loading = false
    });


  }

  createControls() {
    this.theme = new FormControl('', [Validators.required]);
    this.interestcenter = new FormControl('', Validators.required);

  }

  submit(){
    //this.suggestDebateFormGroup.setValue();

    let interstCenter = null;

    for (let i of this.interestcenters){
      if (i.interestcenterid == this.interestcenter.value) {
        interstCenter = i;
        break;
      }
    }

    if (!(interstCenter === null)){
      this.suggestDebateFormGroup.setValue({
        theme:this.theme.value,
        interestcenter:this.interestcenter.value,
        authorid:(new FormControl(environment.userdescriptor.userDetails.userid, Validators.required)).value,
        authoremail:(new FormControl(environment.userdescriptor.userDetails.email, Validators.required)).value,
        authorname:(new FormControl(environment.userdescriptor.userDetails.firstname + '  ' + environment.userdescriptor.userDetails.firstname, Validators.required)).value,
        interestcentername:interstCenter.name,
        interestcenterdescription:interstCenter.description
      });
      console.log("not null: " + JSON.stringify(interstCenter));
    }


    if (this.suggestDebateFormGroup.valid){

      this.loading = true;
      this.message = '';
      this.successResponse = false;

      this.httpClient.post('http://localhost:8001/api/suggesteddebates?scope=USER', this.suggestDebateFormGroup.value, {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer ' +  environment.oauth_client.token),
        'params':this.suggestDebateFormGroup.value
      }).subscribe((res:any)=>{
        console.log(JSON.stringify(res));

        if (res.success == 1 && res.faillure == 0){
          this.message = res.response;
          this.successResponse = true;
          this.suggestDebateFormGroup.reset();

        } else {
          this.successResponse = false;
          this.message = res.response;
        }
        this.loading = false;
      }, error=>{
        console.log(JSON.stringify(error));
        this.successResponse = false;
        this.message = error.statusText;
        this.loading = false;
      },()=>{
        this.loading = false;

      });
    }else{
      console.log('invalide form');
      this.loading = false;
      this.message = 'Des champ du formulaire ont des donnees invalides';
      this.successResponse = false;
    }

  }

}
/*
['suggesteddebateid', 'theme', 'interestcenterid', 'interestcentername', 'interestcenterdescription',
'authorid', 'authoremail', 'authorname', 'moderators', 'result', 'project', 'state', ];

 */
