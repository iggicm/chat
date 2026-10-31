import {Application} from '../../applications/applications.component';

export class ApplicationsResponse {
  success:number;
  faillure: number;
  response: Application[];
  raison: string;
}
