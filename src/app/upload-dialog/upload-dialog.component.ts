import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {forkJoin, Observable, Subject} from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {geoPosition} from '../Constants';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  @ViewChild('file') file;
  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  data:any;
  debate:any;
  comment: any;
  validForm: boolean;

  commentFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data: any, private fb: FormBuilder) {
    this.data = data;
    this.debate = data.debate;
    this.comment = data.comment;
    console.log('Comment in upload File Dialog: ' + JSON.stringify(data.comment) + "\n\nURL: " + data.url + "\n\nDebate: " + JSON.stringify(data.debate));

    this.commentFormGroup = this.fb.group({
      body:new FormControl(this.comment.textbody, Validators.required),
      latitude: new FormControl(geoPosition.latitude),
      longitude: new FormControl(geoPosition.longitude),
      attachedFile:new FormControl(),
      filename:new FormControl(),
      commentid:new FormControl(this.comment.commentid)
    });

    //

    this.commentFormGroup.valueChanges.subscribe(data=>{
      this.validForm = this.comment.textbody.length>0;
    });

  }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    //console.log('files: ' + JSON.stringify(files));
  }


  public upload(files: Set<File>): { [key: string]: { progress: Observable<number> } } {

    /*let commentFormGroup : FormGroup = this.fb.group({

    });*/

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    this.http.post('http://localhost:8001/api/debates/' + this.debate.debateid + '/comments?scope=USER', this.commentFormGroup.value, {
      'headers': new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + environment.oauth_client.token), 'params': this.commentFormGroup.value
    }).subscribe((response:any) => {

        console.log(JSON.stringify(response));

        this.comment.textbody = ' ';

        let succes: number = response.success;
        let faillite: number = response.faillure;
        if (succes === 1 && faillite === 0) {

        } else {
          //this.defined = true;
        }

      }, error => {
        //this.loginResponse = new LoginResponse(0, 1, null, error.error);
        //this.message = this.loginResponse.raison;
      },
      () => {

      });


    console.log('there is : ' + files.size + ' files');

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      console.log('file size: ' + file.size);
      formData.append('file', file, file.name);
      formData.append('commentid', this.comment.commentid);
      let httpHeaders = (new HttpHeaders()).set('Authorization', 'Bearer ' + environment.oauth_client.token);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.data.url, formData, {
        reportProgress: true,
        headers:httpHeaders
      },);


      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
          console.log('percentage: ' + percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          console.log('event: ' + JSON.stringify(event.body));
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;

  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.upload(this.files);

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

}
