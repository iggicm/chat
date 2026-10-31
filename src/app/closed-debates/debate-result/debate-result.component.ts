import {Component, Input, OnInit} from '@angular/core';
import {countries} from '../../Constants';
import {Router} from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-debate-result',
  templateUrl: './debate-result.component.html',
  styleUrls: ['./debate-result.component.css']
})
export class DebateResultComponent implements OnInit {

  @Input('debateResult') debateResult:any;

  isPositive: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isPositive = this.debateResult.issue === '+';
  }


  getCountryName(code:string):string {
    for (let country of countries){
      if (country.code === code){
        return country.name;
      }
    }
    return '';
  }

  showDocumentation(debateid:string){
    this.router.navigate(['/debates/debate-details', debateid]);
  }

  createProject(){
    this.router.navigate(['/debates/projects'], {state:this.debateResult});
  }
}
