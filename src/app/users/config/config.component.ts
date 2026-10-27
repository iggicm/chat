import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../config.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from '../../shared/notification.service';

@Component({
  standalone: false,
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  loadingDonneesPerso:boolean = false;
  succesResponseDonneesPerso:boolean = false;
  messageDonneesPerso:string;

  donneesPersoFormGroup : UntypedFormGroup;
  firstname: UntypedFormControl;
  lastname : UntypedFormControl;


  loadingChangePwd:boolean = false;
  succesResponseChangePwd:boolean = false;
  messageChangePwd:string = '';

  changePwdFormGroup : UntypedFormGroup;
  currentpassword:UntypedFormControl;
  newpassword: UntypedFormControl;
  newpassword_confirmation: UntypedFormControl;

  constructor(private router: Router, private route: ActivatedRoute, private configService: ConfigService, private fb: UntypedFormBuilder, private toastr: ToastrService) {

    this.currentpassword = new UntypedFormControl('', Validators.required);
      this.newpassword = new UntypedFormControl('', Validators.required);
      this.newpassword_confirmation = new UntypedFormControl('', Validators.required);

    this.changePwdFormGroup = this.fb.group({
      currentpassword:this.currentpassword,
      newpassword: this.newpassword,
      newpassword_confirmation: this.newpassword_confirmation
    });

    this.firstname = new UntypedFormControl(environment.userdescriptor.userDetails.firstname, Validators.required);
    this.lastname = new UntypedFormControl(environment.userdescriptor.userDetails.lastname, Validators.required);

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
