import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FileService} from '../../../file.service';
import {forumRootUrl} from '../../../Constants';
import {DomSanitizer} from '@angular/platform-browser';


/*@Pipe({
  standalone: false, name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}*/


@Component({
  standalone: false,
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  styles: [`
        :host ::ng-deep .popover {
          max-width: 900px;
          width: 900px;
          z-index: 1;
        }
    `]
})
export class FileComponent implements OnInit {

  @Input('file') file:string;
  @Input('debateid') debateid:string;
  @Input('commentid') commentid:string;

  setOfType: string[];
  blobToShow: any;
  decodedBlobToSow: any;
  pdfData:any;
  loading = false;
  successResponse = false;
  message = '';
  type:string;
  extention:string;
  base64Data:any;

  rawData:any;
  url:string;

  pdfIconUrl:string = window.location.origin  + '/iggi/chat/assets/img/pdficon.png';
  imgIconUrl:string = window.location.origin  + '/iggi/chat/assets/img/imageicon.png';



  constructor(private fileService:FileService) {
    this.setOfType = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'pdf', 'doc', 'docx'];
    this.loading = false;
    this.successResponse = false;
    this.message = '';
    this.type = '';
    this.extention = '';

  }

  ngOnInit() {

    this.url = forumRootUrl + 'debates/' + this.debateid  + '/comments/' + this.commentid + '/file?file=' + this.file + '&scope=USER';

    this.loading = true;

    this.successResponse = false;
    this.message = '';
    this.fileService.getFile(this.debateid, this.commentid, this.file).subscribe(
      (response)=>{

        this.rawData = response;
        //console.log('\n\nRawData:', this.rawData, '\n\n');
        this.createDataFromBlob(response);
        this.loading = false;

      },
      error=>{
        this.loading = false;
        this.message = error.statusText;
      },
      ()=>{
        this.loading = false;
      }
    );

  }

  createDataFromBlob(blob: Blob) {
    let reader = new FileReader();

    if (blob) {
      reader.readAsDataURL(blob);
    }

    reader.addEventListener("load", () => {
      //data:application/pdf         data:application/pdf;

      this.blobToShow = reader.result;


      let patt = /data:(\w+)\/(\w+);.*/gi;
      let arr = patt.exec(this.blobToShow);

      //console.log('\n\n\n', this.blobToShow , '\n\n\n');

      if (!(arr === null) && arr.length > 0){
        //console.log('\n\narr[0]: ' + arr[0] + '\n\n');
        //console.log('\n\narr[1]: ' + arr[1] + '\n\n');
        //console.log('\n\narr[2]: ' + arr[2] + '\n\n');
        this.type = arr[1];
        this.extention = arr[2];

        //this.type = arr[0].match(/data:application\/(\w+);/gi);
        //console.log('\n\ntype: ' + this.type + '\n\n');
      }else{
        this.type = '';
        this.extention = '';
      }

      if (this.isPdf()){
        //this.decodedBlobToSow = window.atob(this.blobToShow);
        this.base64Data= window.atob(this.blobToShow.substr(this.blobToShow.indexOf(',')+1));
        this.pdfData = {data:this.rawData}
      }

    }, false);


  }

  isImage():boolean{
    return this.type === 'image';
  }

  isPdf(){
    return this.extention === 'pdf' || this.extention === 'PDF';
  }

}
