import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UUID } from 'angular2-uuid';
import {MatStepper} from '@angular/material';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {appConst, countries} from '../Constants';
import {Gender} from '../domain/model/gender';
import {DocumentType} from '../domain/model/documentType';
import {Router} from '@angular/router';
import {DebateService} from '../debate.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit , AfterViewInit{

  debateResult:any;
  appConst: any = appConst;

  @ViewChild('stepper')  myStepper: MatStepper;
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

  globalFormGroup: FormGroup;

  projectFormGroup: FormGroup;
  promoterFormGroup: FormGroup;
  responsibleFormGroup: FormGroup;

  projectid: FormControl;
  projectname: FormControl;
  projectobjective: FormControl;
  projectdescrition: FormControl;
  projectphone: FormControl;
  projectemail: FormControl;
  projectcountry: FormControl;
  projectlocality: FormControl;

  promoterfirstname: FormControl;
  promoterlastname: FormControl;
  promoterbirthdate: FormControl;
  promoterplaceofbirth: FormControl;
  promotergender: FormControl;
  promoterdocumenttype: FormControl;
  promoterdocumentid: FormControl;
  promotercountry: FormControl;
  promotercountryname: FormControl;
  promoterregion: FormControl;
  promoterregionname: FormControl;
  promoterdivision: FormControl;
  promoterdivisionname: FormControl;
  promotertown: FormControl;
  promotertownname: FormControl;
  promoterphone: FormControl;
  promoteremail: FormControl;
  promoterpassword: FormControl;
  promoterpassword_confirmation: FormControl;


  responsiblefirstname: FormControl;
  responsiblelastname: FormControl;
  responsiblegender: FormControl;
  responsiblecountry: FormControl;
  responsiblecountryname: FormControl;
  responsibletownname: FormControl;
  responsibletown: FormControl;
  responsiblephone: FormControl;
  responsibleemail: FormControl;

  constructor(private router: Router , private _formBuilder: FormBuilder, private debateService: DebateService) {
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
    this.globalFormGroup = new FormGroup({});
    this.projectid = new FormControl(UUID.UUID(), Validators.required);
    this.projectname = new FormControl('', Validators.required);
    this.projectobjective = new FormControl('', Validators.required);
    this.projectdescrition = new FormControl('', Validators.required);
    this.projectphone = new FormControl('', Validators.required);
    this.projectemail = new FormControl('', [Validators.required, Validators.email]);
    this.projectcountry =  new FormControl('',Validators.required);
    this.projectlocality = new FormControl('', Validators.required);

    this.promoterfirstname = new FormControl('', Validators.required);
    this.promoterlastname = new FormControl('', Validators.required);
    this.promoterbirthdate = new FormControl('', Validators.required);
    this.promoterplaceofbirth = new FormControl('', Validators.required);
    this.promotergender = new FormControl('', Validators.required);
    this.promoterdocumenttype = new FormControl('', Validators.required);
    this.promoterdocumentid = new FormControl('', Validators.required);
    this.promotercountry = new FormControl('');
    this.promotercountryname = new FormControl('Cameroun', Validators.required);
    this.promoterregion = new FormControl('');
    this.promoterregionname = new FormControl('');
    this.promoterdivision = new FormControl('');
    this.promoterdivisionname = new FormControl('');
    this.promotertown = new FormControl('');
    this.promotertownname = new FormControl('', Validators.required);
    this.promoterphone = new FormControl('', Validators.required);
    this.promoterpassword = new FormControl('', Validators.required);
    this.promoterpassword_confirmation = new FormControl('', Validators.required);
    this.promoteremail = new FormControl('', [Validators.required, Validators.email]);


    this.responsiblefirstname = new FormControl('', Validators.required);
    this.responsiblelastname = new FormControl('', Validators.required);
    this.responsiblegender = new FormControl('', Validators.required);
    this.responsiblecountry = new FormControl('', Validators.required);
    this.responsiblecountryname = new FormControl('Cameroon', Validators.required);
    this.responsibletownname = new FormControl('', Validators.required);
    this.responsibletown = new FormControl('');
    this.responsiblephone = new FormControl('', Validators.required);
    this.responsibleemail = new FormControl('', [Validators.required, Validators.email]);

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
