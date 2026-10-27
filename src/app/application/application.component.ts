import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Gender} from '../domain/model/gender';
import {countries, idRootUrl} from '../Constants';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs';

export interface MyResponse {
  success:number;
  faillure:number;
  response:any;
  raison:any;
}

@Component({
  standalone: false,
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  public genders:Array<Gender> = [
    {value:'', viewValue:'Sexe'},
    {value:'MALE', viewValue:'Home'},
    {value:'FEMALE', viewValue:'Femme'}
  ];

  countries = countries;

  cityofresidencies:any[];
  interestcenters:any[];

  idRootUrl:string = idRootUrl;


  applicationFormGroup: UntypedFormGroup;
  email: UntypedFormControl;
  firstname: UntypedFormControl;
  lastname: UntypedFormControl;
  photo: UntypedFormControl;

  cityofresidency: UntypedFormControl;
  interestcenter: UntypedFormControl;

  phone: UntypedFormControl;
  commenttotheregistration: UntypedFormControl;
  gender: UntypedFormControl;

  latitude: UntypedFormControl;
  longitude: UntypedFormControl;


  lat:number=0.0;
  lon:number=0.0;

  byteLoaded : number = 0;
  byteTotal: number = 0;


  country: UntypedFormControl;

  error:boolean = false;
  message:string = '';

  color = 'primary';
  mode = 'determinate';
  value = 50;
  loading = false;
  label = "Veuillez patienter s'il vous plait";

  @ViewChild('photo', {static: false})
  fileInput: ElementRef;

  file:File;

  filename:UntypedFormControl;


  successType: string = "success";
  faillureType : string = "danger";
  success: boolean = false;
  faillure: boolean = false;


  constructor(private _formBuilder: UntypedFormBuilder, private httpClient:HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit() {

    this.createControls();

    if (navigator.geolocation) {
      /* géolocalisation possible */
      console.log('navigator.geolocation');
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude.setValue(position.coords.latitude);
         this.longitude.setValue(position.coords.longitude);
        // console.log('latitude: ' + this.latitude.value + ', longitude: ' + this.longitude.value);
      });
    } else {
      console.log("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
    }



    this.applicationFormGroup = this._formBuilder.group({
      email: this.email,
      firstname:this.firstname,
      lastname: this.lastname,
      photo:this.photo,
      cityofresidency:this.cityofresidency,
      interestcenter:this.interestcenter,
      phone:this.phone,
      commenttotheregistration:this.commenttotheregistration,
      gender:this.gender,
      country:this.country,
      latitude: this.latitude,
      longitude: this.longitude,
      filename:this.filename
    });

    this.httpClient.get(idRootUrl + 'users-cities',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
    }).subscribe((res:MyResponse)=>{
      //console.log(JSON.stringify(res));
      //{"success":1,"faillure":0,"response":[{"cityofresidency":"Douala"},{"cityofresidency":"Nkongsung"}]}
      let response:Array<any> = res.response;
      this.cityofresidencies = [];
      for (let a=0; a<response.length; a++){
        this.cityofresidencies.push(response[a].cityofresidency);
      }
    },error=>{

    });


    this.httpClient.get(idRootUrl + 'interestcenters',{
      'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
    }).subscribe((res:MyResponse)=>{
      //console.log(JSON.stringify(res));
      //{"success":1,"faillure":0,"response":[{"id":1,"interestcenterid":"5672b0af-2dcf-11e9-8c50-ac2b6ee888a2","name":"Sante Marternel",
      // "description":"Sante Marternel","created_at":"2019-02-11 08:33:34","updated_at":"2019-02-11 08:33:34"},{"id":2,"interestcenterid":"8df2f96b-2dcf-11e9-8c50-ac2b6ee888a2","name":"Agriculture Marechere","description":"Agriculture Marechere","created_at":"2019-02-11 08:35:07","updated_at":"2019-02-11 08:35:07"}]}
      let response:Array<any> = res.response;
      this.interestcenters = [];
      for (let a=0; a<response.length; a++){
        this.interestcenters.push(response[a]);
      }
    },error=>{

    });
  }


  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      //this.applicationFormGroup.get('photo').setValue(this.file);
      //this.applicationFormGroup.get('photo').setValue(this.file.name);
      //this.fileInformation = null;
      this.filename.setValue(this.file.name);
      console.log('FILE.SIZE = ' + this.file.size);
    }
  }

  createControls() {
    this.applicationFormGroup = new UntypedFormGroup({});

    /*
    email: UntypedFormControl;
  firstname: UntypedFormControl;
  lastname: UntypedFormControl;
  photo: UntypedFormControl;

  cityofresidency: UntypedFormControl;
  interestcenter: UntypedFormControl;

  phone: UntypedFormControl;
  commenttotheregistration: UntypedFormControl;
     */
    this.email = new UntypedFormControl('', [Validators.required, Validators.email]);
    this.firstname = new UntypedFormControl('', Validators.required);
    this.lastname = new UntypedFormControl('', Validators.required);
    this.photo = new UntypedFormControl('', Validators.required);
    this.cityofresidency = new UntypedFormControl('', [Validators.required]);
    this.interestcenter =  new UntypedFormControl('',Validators.required);
    this.phone = new UntypedFormControl('', Validators.required);
    this.commenttotheregistration = new UntypedFormControl('', Validators.required);
    this.gender = new UntypedFormControl('', Validators.required);
    this.country = new UntypedFormControl('', Validators.required);
    this.latitude = new UntypedFormControl(''+this.lat, Validators.required);
    this.longitude = new UntypedFormControl(''+this.lon, Validators.required);
    this.filename = new UntypedFormControl();
    //this.projectid = new UntypedFormControl(crypto.randomUUID(), Validators.required);


  }

  onPhotoChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.applicationFormGroup.patchValue({
          photo: reader.result
        });

        console.log("FILE: " + JSON.stringify(reader.result));

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }


  /*private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('avatar', this.form.get('avatar').value);
    input.append('name', this.form.get('name').value);

    return input;
  }
*/
  submit(){
    if (this.applicationFormGroup.valid){


      //console.log(JSON.stringify(this.applicationFormGroup.value));

      //this.applicationFormGroup.setControl('photo',this.photo);

      let data: FormData = new FormData();
      data.append('photo', this.file);
      data.append('email', this.applicationFormGroup.get('email').value);
      data.append('firstname', this.applicationFormGroup.get('firstname').value);
      data.append('lastname', this.applicationFormGroup.get('lastname').value);
      data.append('cityofresidency', this.applicationFormGroup.get('cityofresidency').value);
      data.append('interestcenter', this.applicationFormGroup.get('interestcenter').value);
      data.append('phone', this.applicationFormGroup.get('phone').value);
      data.append('commenttotheregistration', this.applicationFormGroup.get('commenttotheregistration').value);
      data.append('gender', this.applicationFormGroup.get('gender').value);

      data.append('country', this.applicationFormGroup.get('country').value);
      data.append('latitude', this.applicationFormGroup.get('latitude').value);
      data.append('longitude', this.applicationFormGroup.get('longitude').value);

      console.log('DATA: ' + JSON.stringify(data));

      let url : string = idRootUrl + 'applications';

      const req = new HttpRequest('POST', url, data, {reportProgress: true});
      // create a new progress-subject for every file
      const progress = new Subject<number>();

      this.loading = true;
      this.message = "";
      this.success = this.faillure = false;
      // send the http-request and subscribe for progress-updates
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.byteLoaded = event.loaded;
          this.byteTotal = event.total;
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          let response = <MyResponse>event.body;
          console.log("CORPS: " + JSON.stringify(response));
          this.loading = false;

          this.success = response.success === 1;
          this.faillure = response.faillure === 1;
          if (this.success){
            this.message = response.response;
          } else {
            this.message = response.raison;
          }
          /*let succes: number = response.success;
          let faillite: number = response.faillure;
          if (succes === 1 && faillite === 0) {
            this.error = false;
            this.message = response.response;

          }else {
            this.error = true;
            this.message = response.raison;
          }*/

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();

          this.applicationFormGroup.reset();
        }
      });


      /*
      email: this.email,
      firstname:this.firstname,
      lastname: this.lastname,
      photo:this.photo,
      cityofresidency:this.cityofresidency,
      interestcenter:this.interestcenter,
      phone:this.phone,
      commenttotheregistration:this.commenttotheregistration,
      gender:this.gender,
      country:this.country,
      latitude: this.latitude,
      longitude: this.longitude,
      filename:this.filename
       */

      /*this.httpClient.post(url, data, {
        'headers':new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json'),'params':{
          //'photo':this.file,
          'email':this.applicationFormGroup.get('email').value,
          'firstname': this.applicationFormGroup.get('firstname').value,
          'lastname':this.applicationFormGroup.get('lastname').value,
          'cityofresidency':this.applicationFormGroup.get('cityofresidency').value,
          'interestcenter':this.applicationFormGroup.get('interestcenter').value,
          'phone':this.applicationFormGroup.get('phone').value,
          'commenttotheregistration':this.applicationFormGroup.get('commenttotheregistration').value,
          'gender':this.applicationFormGroup.get('gender').value,
          'country':this.applicationFormGroup.get('country').value,
          'latitude': this.applicationFormGroup.get('latitude').value,
          'longitude': this.applicationFormGroup.get('longitude').value
        }
      }).subscribe((response:MyResponse)=>{

          console.log('RESPONSE   :   ' + JSON.stringify(response));

          let succes: number = response.success;
          let faillite: number = response.faillure;
          if (succes === 1 && faillite === 0) {
            this.error = false;
            this.message = response.response;

          }else {
            this.error = true;
            this.message = response.raison;
          }

        },error => {
          //this.loginResponse = new LoginResponse(0, 1, null, error.error);

          this.error = true;
          this.message = JSON.stringify(error);
        },
        () => {
          this.loading = false;
          //this.init();
        });*/
    }else{
      console.log("INVALID: " + JSON.stringify(this.applicationFormGroup.value));
    }
  }


  displayNone():string{
    return 'none';
  }

  close() {
    if (this.success){
      this.success = !this.success;
    }
    if (this.faillure){
      this.faillure = !this.faillure;
    }
    console.log('close call');
  }

}
