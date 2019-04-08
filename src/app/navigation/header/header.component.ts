import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated:boolean = false;

  //loginComponent: LoginComponent;

  user: any ;
  name:string;

  constructor(private loginservice:LoginService) {
    this.isAuthenticated = !(environment.oauth_client.token === '');
  }

  ngOnInit() {
    this.loginservice.change.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      //console.log('in header catch emitted: ' + this.isAuthenticated);

      if (this.isAuthenticated){
        //console.log('in header environment.userdescriptor = ' + JSON.stringify(environment.userdescriptor ));
        //users.environment.userdescriptor:  {"userDetails":{"userid":"cb35c7e0-2d01-11e9-b338-b328d4b73607","firstname":"Douki","lastname":"Ange","email":"didnkallaehawe@gmail.com","phone":"691179154","enablement":1}}
        this.user = environment.userdescriptor.userDetails;
        this.name = this.user.firstname + '  ' + this.user.lastname;
      }

    });
  }

  /*public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }*/

}
