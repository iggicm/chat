import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DebateService} from '../../debate.service';

@Component({
  standalone: false,
  selector: 'app-debate-details',
  templateUrl: './debate-details.component.html',
  styleUrls: ['./debate-details.component.css'],
  styles: [`
        :host ::ng-deep .popover {
          max-width: 100%;
          width: 650px;
        }
    `]
})
export class DebateDetailsComponent implements OnInit {

  debateid:string;
  debate:any;

  loading = false;
  successResponse = false;
  message = '';

  comments: Array<any>;
  files: Array<any>;


  constructor(private router: Router, private route: ActivatedRoute, private debateService:DebateService) {

    this.debate = null;
    this.loading = false;
    this.successResponse = false;
    this.message = '';
    this.comments = [];
    this.files = [];

  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      //console.log(JSON.stringify(param));
      this.debateid = param.debateid;

      this.loading = true;
      this.successResponse = false;
      this.message = '';
      this.debateService.getDebateById(this.debateid).subscribe(
        (response)=>{
          //console.log('DEBATE: ', JSON.stringify(response));
          if (response.success === 1 && response.faillure===0){
            this.debate = response.response;
            this.successResponse = true;
          } else{
            this.successResponse = false;
            this.message = response.raison;
          }
          this.loading = false;
        },
        error=>{
          this.message = error.statusText;
          this.successResponse = false;
          this.loading = false;
        },
        ()=>{
          this.loading = false;

          this.debateService.getComments(this.debateid).subscribe(
            (response:any)=>{

              //console.log(JSON.stringify(response));

              let succes: number = response.success;
              let faillite: number = response.faillure;
              if (succes === 1 && faillite === 0) {
                this.comments = response.response.comments;
                if (this.comments.length === 0){
                  this.message = 'Aucun commentaire trouve';
                  this.successResponse = false;
                } else{
                  this.successResponse = true;
                  this.files = [];
                  for (let c of this.comments){
                    let fichiers = this.transformeToArray(c.files);
                    for (let f of fichiers){
                      this.files.push({file:f,commentid:c.commentid});
                    }
                  }
                }
              }else{
                this.message = response.raison;
                this.successResponse = false;
              }

              this.loading = false;

            },error => {
              //this.loginResponse = new LoginResponse(0, 1, null, error.error);
              this.message = error.statusText;
              this.loading = false;
              this.successResponse = false;
            },
            () => {
              this.loading = false;
            }
          );

        }
      );

    });
  }

  transformeToArray(str:string):Array<any>{
    try {
      //console.log('str: ' + str);
      return JSON.parse(str);

    }catch (e) {
      //console.log('Error: ' + JSON.stringify(e.message));
      return [];
    }
  }

  extractFile(f:string):string{
    let vet = f.split('/');
   return vet[vet.length - 1];
  }

}
