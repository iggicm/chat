import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../config.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  loadingDonneesPerso:boolean = false;
  succesResponseDonneesPerso:boolean = false;
  messageDonneesPerso:string;

  donneesPersoFormGroup : FormGroup;
  firstname: FormControl;
  lastname : FormControl;


  loadingChangePwd:boolean = false;
  succesResponseChangePwd:boolean = false;
  messageChangePwd:string = '';

  changePwdFormGroup : FormGroup;
  currentpassword:FormControl;
  newpassword: FormControl;
  newpassword_confirmation: FormControl;

  constructor(private router: Router, private route: ActivatedRoute, private configService: ConfigService, private fb: FormBuilder, private toastr: ToastrService) {

    this.currentpassword = new FormControl('', Validators.required);
      this.newpassword = new FormControl('', Validators.required);
      this.newpassword_confirmation = new FormControl('', Validators.required);

    this.changePwdFormGroup = this.fb.group({
      currentpassword:this.currentpassword,
      newpassword: this.newpassword,
      newpassword_confirmation: this.newpassword_confirmation
    });

    this.firstname = new FormControl(environment.userdescriptor.userDetails.firstname, Validators.required);
    this.lastname = new FormControl(environment.userdescriptor.userDetails.lastname, Validators.required);

    this.donneesPersoFormGroup = this.fb.group({
      firstname:this.firstname,
      lastname:this.lastname
    });


  }

  ngOnInit() {
  }

  updateDonneesPerso(){

  }

  updatePwd(){

    this.loadingChangePwd = true;
    this.succesResponseChangePwd = false;
    this.messageChangePwd = '';
    if (this.changePwdFormGroup.valid){

      this.configService.updatePwd(this.changePwdFormGroup).subscribe(
        response=>{

          this.loadingChangePwd = false;
          if (response.success === 1 && response.faillure === 0){
            this.loadingChangePwd = false;
            this.succesResponseChangePwd = true;
            this.messageChangePwd = response.response;
            this.toastr.success(response.response, 'Modification de mot de passe',  {
              timeOut: 10000,
              closeButton: true,
              enableHtml:true,
              positionClass: 'toast-top-full-width'

            });
          } else {
            this.loadingChangePwd = false;
            this.succesResponseChangePwd = false;
            this.messageChangePwd = response.raison;
            this.toastr.error(response.raison, 'Modification de mot de passe',  {
              timeOut: 10000,
              closeButton: true,
              enableHtml:true,
              positionClass: 'toast-top-full-width'

            });
          }
        },
        error=>{
          this.loadingChangePwd = false;
          this.succesResponseChangePwd = false;
          this.messageChangePwd = error.statusText;
          this.toastr.error(error.statusText, 'Modification de mot de passe',  {
            timeOut: 10000,
            closeButton: true,
            enableHtml:true,
            positionClass: 'toast-top-full-width'

          });
        },
        ()=>{
          this.loadingChangePwd = false;
        }
      );

    } else{
      this.loadingChangePwd = false;
      this.succesResponseChangePwd = false;
      this.messageChangePwd = 'Formulaire incomplete';

      this.toastr.error('Formulaire incomplete', 'Modification de mot de passe',  {
        timeOut: 10000,
        closeButton: true,
        enableHtml:true,
        positionClass: 'toast-top-full-width'

      });
    }

  }
}
