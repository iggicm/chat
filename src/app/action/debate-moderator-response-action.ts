import {Action} from '@ngrx/store';
import {ApplicationsResponse} from '../domain/model/ApplicationsResponse';


export const ADD_APPLICATIONS_RESPONSE = 'ADD_APPLICATIONS_RESPONSE';
export const ADD_USERS_RESPONSE = 'ADD_USERS_RESPONSE';
export interface AddApplicationsResponseAction extends Action {
  type: string;
  applicationsResponse: ApplicationsResponse;
  //usersResponse:
}


