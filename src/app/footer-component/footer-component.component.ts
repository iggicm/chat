import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {

  copyrightDate: Date;


  constructor() {
    this.copyrightDate = new Date();
  }

  ngOnInit() {
  }

}
