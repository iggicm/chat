import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DebateService} from '../../debate.service';
import {AccessService} from '../../access.service';

@Component({
  selector: 'app-resumed-debates',
  templateUrl: './resumed-debates.component.html',
  styleUrls: ['./resumed-debates.component.css']
})
export class ResumedDebatesComponent implements OnInit {

  debatesResults: Array<any>;

  loading:boolean;
  isAdmin:boolean = false;
  connectedUserId:string;
  message:string;
  successResponse:boolean;

  constructor(private debateService: DebateService, private accessService: AccessService) {
    this.connectedUserId = environment.userdescriptor.userDetails.userid;
    this.loading = false;
    this.message = '';
    this.successResponse = false;
  }

  ngOnInit() {

    this.loading = true;
    this.message = '';
    this.successResponse = false;
   this.debateService.getDebateResults().subscribe(response=>{
        //console.log(JSON.stringify(response));
        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {
          this.debatesResults = response.response;
          this.successResponse = true;
        }else{
          this.message = response.raison;
          this.successResponse = false;
        }
        this.loading = false;

      },error => {
        this.message = error.statusText;
        this.loading = false;
      },
      () => {
        this.loading = false;
      });

    this.accessService.isAdmin().toPromise().then(res=>{
      //console.log('promise ' + JSON.stringify(res));
      this.isAdmin = res != '0';
      //console.log('isAdmin:::::::::::::' + this.isAdmin);
    },error=>{
      this.isAdmin =  false;
    });

  }

}
