import {Component, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
/*
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}*/



@Component({
  selector: 'app-show-file-dialog',
  templateUrl: './show-file-dialog.component.html',
  styleUrls: ['./show-file-dialog.component.css'],
  styles: [`
        :host >>> .popover {
          max-width: 100%;
          width: 650px;
        }
    `]
})
export class ShowFileDialogComponent implements OnInit {

  data:any;
  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }

  ngOnInit() {

  }

  isDocFile(url:string):boolean{
    let arrayResult:string[] = url.split('.');
    if (arrayResult.length == 0){
      return false;
    }
    return arrayResult[arrayResult.length - 1] === 'doc' || arrayResult[arrayResult.length - 1] === 'docx';
  }
}
