import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../users.component';
import {countries, idRootUrl} from '../../Constants';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  standalone: false,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input('user') user:any;
  @Output('userAccepted') userAccepted = new EventEmitter<any>();
  genderimg: string;
  countryName:string;

  photoUrl:string;
  isAdmin: boolean;
  loading:boolean;
  succesResponse:boolean;
  message:string;


  constructor(private httpClient:HttpClient) {

  }

  ngOnInit() {
    if (this.user.gender.toLocaleLowerCase() === 'male'){
      this.genderimg = 'male.png';
    } else {
      this.genderimg = 'female.png';
    }

    for (let country of countries){
      if (country.code === this.user.country){
        this.countryName = country.name;
        break;
      }
    }


    this.photoUrl = idRootUrl + 'users/' + this.user.userid  + '/photo';//'url(\'' + + '/photo\')'

    //console.log('photoUrl: ' + this.photoUrl);

    this.isAdmin = environment.userdescriptor.userDetails.isAdmin;
  }
//
  proposeAsAdmin(userid:string){

    this.loading = true;
    this.succesResponse = false;
    this.message = '';

    let connecteduserid:string = environment.userdescriptor.userDetails.userid;
    this.httpClient.post(idRootUrl + 'administratorpropositions?scope=ADMINISTRATOR', {}, {
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' +  environment.oauth_client.token),
      'params':{
        'proposeduserid':userid,
        'proposed_by':connecteduserid
      }
    }).subscribe((res: any)=>{

      //console.log(JSON.stringify(res));

      if (res.success == 1 && res.faillure == 0){
        this.message = res.response;
        this.succesResponse = true;
        //console.log('Emitting: ' + JSON.stringify(this.user));
        this.userAccepted.emit(this.user);

      } else{
        this.message = res.raison;
        this.succesResponse = false;
      }

      this.loading = false;

    }, error=>{

      //console.log(JSON.stringify(error));
      this.loading = false;
      this.message = error.statusText;
      this.succesResponse = false;


    },()=>{

    });
  }

}
