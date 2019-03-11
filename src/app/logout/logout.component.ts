import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MyResponse} from '../application/application.component';
import {ApplicationsResponse} from '../domain/model/ApplicationsResponse';
import {ADD_APPLICATIONS_RESPONSE, AddApplicationsResponseAction} from '../action/applications-response-action';
import {appStore} from '../store/AppStore';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  loading = false;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private loginservice:LoginService) {

  }

  ngOnInit() {

    //let userdescriptor = JSON.parse(localStorage.getItem('userdescriptor'));
    //environment.userdescriptor.userDetails

    if (environment.userdescriptor != null){
    console.log('environment.userdescriptor: ' + JSON.stringify(environment.userdescriptor));

    console.log('userdescriptor.userDetails.userid: ' + environment.userdescriptor.userDetails.userid);
    console.log('environment.oauth_client.token:  ' + environment.oauth_client.token);
    this.loading = true;
    this.httpClient.post('http://localhost:8000/api/users/' + environment.userdescriptor.userDetails.userid + '/logout', {}, {
      'headers': new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params': {}
    }).subscribe((response: MyResponse) => {

        console.log('applications: ' + JSON.stringify(response));

        let succes: number = response.success;
        let faillite: number = response.faillure;


        /*if (succes === 1 && faillite === 0) {
          this.applications = response.response;
          let applicationsResponse : ApplicationsResponse = <ApplicationsResponse>response;

          let applicationsResponseAction:AddApplicationsResponseAction={
            type:ADD_APPLICATIONS_RESPONSE, applicationsResponse:applicationsResponse
          };

          appStore.dispatch(applicationsResponseAction);
        }*/

      }, error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      },
      () => {
        this.loading = false;
        environment.oauth_client.token = '';
        environment.userdescriptor = null;
        this.loginservice.toggle();
        console.log('navigationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        this.router.navigate(['/login'], {relativeTo: this.route.parent});
        //document.location.reload();
      });
  }else {
      this.router.navigate(['/login'], {relativeTo: this.route.parent});

    }
  }

}
