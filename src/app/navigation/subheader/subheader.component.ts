import {Component, Input, OnInit} from '@angular/core';
import {idRootUrl} from '../../Constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  standalone: false,
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  @Input('isAdmin') isAdmin : boolean;

  constructor() {

  }

  ngOnInit() {
    //console.log("IS ADMINOOOOOOOOOOOO: " + this.isAdmin);
  }

}
