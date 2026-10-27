import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  standalone: false,
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userid:string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {

  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
        //console.log(JSON.stringify(param));
        this.userid=param.userid;
        //console.log('userid: ' + this.userid);

        //console.log(environment);

      }
    );
  }

}
