import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl} from '@angular/forms';

import {MatStepper} from '@angular/material/stepper';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {appConst, countries} from '../Constants';
import {Gender} from '../domain/model/gender';
import {DocumentType} from '../domain/model/documentType';
import {Router} from '@angular/router';
import {DebateService} from '../debate.service';


@Component({
  standalone: false,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit , AfterViewInit{

  debateResult:any;
  appConst: any = appConst;

  @ViewChild('stepper', {static: false})  myStepper: MatStepper;
  promoterSelectedCountry:any={
    name:'', code:''
  };
  countries = countries;
  totalStepsCount: number;
  //hidden:string = 'hidden';
  public genders:Array<Gender> = [
    {value:'', viewValue:'Sexe'},
    {value:'MALE', viewValue:'Home'},
    {value:'FEMALE', viewValue:'Femme'}
  ];

  documenttypes:Array<DocumentType> = [
    {value:'', viewValue:'Type de Document'},
    {value:'1', viewValue:'CNI/NIC (Carte Nationale D\'identite / National Identity Card)'},
    {value:'2', viewValue:'passeport / Passport'}
  ];

  promoterPhoneNumber:string = '';

  globalFormGroup: UntypedFormGroup;

  projectFormGroup: UntypedFormGroup;
  promoterFormGroup: UntypedFormGroup;
  responsibleFormGroup: UntypedFormGroup;

  projectid: UntypedFormControl;
  projectname: UntypedFormControl;
  projectobjective: UntypedFormControl;
  projectdescrition: UntypedFormControl;
  projectphone: UntypedFormControl;
  projectemail: UntypedFormControl;
  projectcountry: UntypedFormControl;
  projectlocality: UntypedFormControl;

  promoterfirstname: UntypedFormControl;
  promoterlastname: UntypedFormControl;
  promoterbirthdate: UntypedFormControl;
  promoterplaceofbirth: UntypedFormControl;
  promotergender: UntypedFormControl;
  promoterdocumenttype: UntypedFormControl;
  promoterdocumentid: UntypedFormControl;
  promotercountry: UntypedFormControl;
  promotercountryname: UntypedFormControl;
  promoterregion: UntypedFormControl;
  promoterregionname: UntypedFormControl;
  promoterdivision: UntypedFormControl;
  promoterdivisionname: UntypedFormControl;
  promotertown: UntypedFormControl;
  promotertownname: UntypedFormControl;
  promoterphone: UntypedFormControl;
  promoteremail: UntypedFormControl;
  promoterpassword: UntypedFormControl;
  promoterpassword_confirmation: UntypedFormControl;


  responsiblefirstname: UntypedFormControl;
  responsiblelastname: UntypedFormControl;
  responsiblegender: UntypedFormControl;
  responsiblecountry: UntypedFormControl;
  responsiblecountryname: UntypedFormControl;
  responsibletownname: UntypedFormControl;
  responsibletown: UntypedFormControl;
  responsiblephone: UntypedFormControl;
  responsibleemail: UntypedFormControl;

  constructor(private router: Router , private _formBuilder: UntypedFormBuilder, private debateService: DebateService) {
    this.debateResult = this.router.getCurrentNavigation().extras.state;
  }
  ngOnInit() {

    this.createControls();

    this.projectFormGroup = this._formBuilder.group({
      projectid: this.projectid,
      projectname:this.projectname,
      projectobjective: this.projectobjective,
      projectdescrition:this.projectdescrition,
      projectphone:this.projectphone,
      projectemail:this.projectemail,
      projectcountry:this.projectcountry,
      projectlocality:this.projectlocality
    });

    this.promoterFormGroup = this._formBuilder.group({
      promoterfirstname: this.promoterfirstname,
      promoterlastname: this.promoterlastname,
      promoterbirthdate: this.promoterbirthdate,
      promoterplaceofbirth: this.promoterplaceofbirth,
      promotergender: this.promotergender,
      promoterdocumenttype: this.promoterdocumenttype,
      promoterdocumentid: this.promoterdocumentid,
      promotercountry: this.promotercountry,
      promotercountryname: this.promotercountryname,
      promoterregion: this.promoterregion,
      promoterregionname: this.promoterregionname,
      promoterdivision: this.promoterdivision,
      promoterdivisionname: this.promoterdivisionname,
      promotertown: this.promotertown,
      promotertownname: this.promotertownname,
      promoterphone: this.promoterphone,
      promoteremail: this.promoteremail,
      promoterpassword: this.promoterpassword,
      promoterpassword_confirmation: this.promoterpassword_confirmation
    });

    this.responsibleFormGroup = this._formBuilder.group({
      responsiblefirstname: this.responsiblefirstname,
      responsiblelastname: this.responsiblelastname,
      responsiblegender: this.responsiblegender,
      responsiblecountry: this.responsiblecountry,
      responsiblecountryname: this.responsiblecountryname,
      responsibletownname: this.responsibletownname,
      responsibletown: this.responsibletown,
      responsiblephone: this.responsiblephone,
      responsibleemail: this.responsibleemail

    });

    //console.log(JSON.stringify(this.globalFormGroup.value));

  }

  createControls() {
    this.globalFormGroup = new UntypedFormGroup({});
    this.projectid = new UntypedFormControl(crypto.randomUUID(), Validators.required);
    this.projectname = new UntypedFormControl('', Validators.required);
    this.projectobjective = new UntypedFormControl('', Validators.required);
    this.projectdescrition = new UntypedFormControl('', Validators.required);
    this.projectphone = new UntypedFormControl('', Validators.required);
    this.projectemail = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.projectcountry =  new UntypedFormControl('',Validators.required);
    this.projectlocality = new UntypedFormControl('', Validators.required);

    this.promoterfirstname = new UntypedFormControl('', Validators.required);
    this.promoterlastname = new UntypedFormControl('', Validators.required);
    this.promoterbirthdate = new UntypedFormControl('', Validators.required);
    this.promoterplaceofbirth = new UntypedFormControl('', Validators.required);
    this.promotergender = new UntypedFormControl('', Validators.required);
    this.promoterdocumenttype = new UntypedFormControl('', Validators.required);
    this.promoterdocumentid = new UntypedFormControl('', Validators.required);
    this.promotercountry = new UntypedFormControl('');
    this.promotercountryname = new UntypedFormControl('Cameroun', Validators.required);
    this.promoterregion = new UntypedFormControl('');
    this.promoterregionname = new UntypedFormControl('');
    this.promoterdivision = new UntypedFormControl('');
    this.promoterdivisionname = new UntypedFormControl('');
    this.promotertown = new UntypedFormControl('');
    this.promotertownname = new UntypedFormControl('', Validators.required);
    this.promoterphone = new UntypedFormControl('', Validators.required);
    this.promoterpassword = new UntypedFormControl('', Validators.required);
    this.promoterpassword_confirmation = new UntypedFormControl('', Validators.required);
    this.promoteremail = new UntypedFormControl('', [Validators.required, Validators.email]);


    this.responsiblefirstname = new UntypedFormControl('', Validators.required);
    this.responsiblelastname = new UntypedFormControl('', Validators.required);
    this.responsiblegender = new UntypedFormControl('', Validators.required);
    this.responsiblecountry = new UntypedFormControl('', Validators.required);
    this.responsiblecountryname = new UntypedFormControl('Cameroon', Validators.required);
    this.responsibletownname = new UntypedFormControl('', Validators.required);
    this.responsibletown = new UntypedFormControl('');
    this.responsiblephone = new UntypedFormControl('', Validators.required);
    this.responsibleemail = new UntypedFormControl('', [Validators.required, Validators.email]);

  }

  getCountryPromoter(country:any){

  }

  displayNone():string{
    return 'none';
  }


  goForward(steper:MatStepper){
    //steper.next();
    /*console.log(JSON.stringify(this.promoterFormGroup.value));
    console.log(JSON.stringify(this.promoterFormGroup.valid));

    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterfirstname.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterlastname.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterbirthdate.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterplaceofbirth.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promotergender.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterdocumenttype.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterdocumentid.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promotercountry.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promotercountryname.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterregion.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterregionname.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterdivision.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterdivisionname.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promotertown.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promotertownname.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterphone.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterpassword.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoterpassword_confirmation.valid));
    console.log(JSON.stringify(this.promoterFormGroup.controls.promoteremail.valid));

    console.log(JSON.stringify(this.responsibleFormGroup.value));*/


  }

  ngAfterViewInit(): void {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  promoterCountryIsCameroon():boolean{
    return this.promoterSelectedCountry.code === 'CM';
  }

  submit(){
    //this.goForward(null);
    //this.globalFormGroup = Object.assign({} , this.projectFormGroup, this.promoterFormGroup, this.responsibleFormGroup);

    this.globalFormGroup = this._formBuilder.group(
      {
        projectid: this.projectid,
        projectname:this.projectname,
        projectdescrition:this.projectdescrition,
        projectphone:this.projectphone,
        projectemail:this.projectemail,
        projectcountry:this.projectcountry,
        projectlocality:this.projectlocality,
        promoterfirstname: this.promoterfirstname,
        promoterlastname: this.promoterlastname,
        promoterbirthdate: this.promoterbirthdate,
        promoterplaceofbirth: this.promoterplaceofbirth,
        promotergender: this.promotergender,
        promoterdocumenttype: this.promoterdocumenttype,
        promoterdocumentid: this.promoterdocumentid,
        promotercountry: this.promotercountry,
        promotercountryname: this.promotercountryname,
        promoterregion: this.promoterregion,
        promoterregionname: this.promoterregionname,
        promoterdivision: this.promoterdivision,
        promoterdivisionname: this.promoterdivisionname,
        promotertown: this.promotertown,
        promotertownname: this.promotertownname,
        promoterphone: this.promoterphone,
        promoteremail: this.promoteremail,
        promoterpassword: this.promoterpassword,
        promoterpassword_confirmation: this.promoterpassword_confirmation,
        responsiblefirstname: this.responsiblefirstname,
        responsiblelastname: this.responsiblelastname,
        responsiblegender: this.responsiblegender,
        responsiblecountry: this.responsiblecountry,
        responsiblecountryname: this.responsiblecountryname,
        responsibletownname: this.responsibletownname,
        responsibletown: this.responsibletown,
        responsiblephone: this.responsiblephone,
        responsibleemail: this.responsibleemail
      }
    );

    console.log("\n\nASSIGN: " + JSON.stringify(this.globalFormGroup.value) + "\n\nValid: " + this.globalFormGroup.valid+"\n\n");

    if (this.globalFormGroup.valid){

      let mesoption = [{key:'headers', value:new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
          .set('Authorization', 'Bearer '+ 'long token here') }, {key:'cle', value:'valeur'}, {key:'params', value:this.globalFormGroup.value}];
      let observable:Observable<any> = this.debateService.submitProject('http://192.168.43.71:8000/api/projects', this.globalFormGroup, 'POST', mesoption);
      observable.subscribe(res=>{
        console.log(JSON.stringify(res));
      }, error => {
        console.log(JSON.stringify(error));
      });
    }

  }

  getCountNameByCode(code:string):string{
    for (let country of this.countries){
      if (country.code == code){
        return country.name;
      }
    }
    return "";
  }

  getDocumentTypeNameByValue(val:string):string{
    for (let type of this.documenttypes){
      if (type.value == val){
        return type.viewValue;
      }
    }
    return "";
  }

}
