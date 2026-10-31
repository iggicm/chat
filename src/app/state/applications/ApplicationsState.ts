import {Application} from '../../applications/applications.component';


export interface ApplicationsState {
  applications: Array<Application>;
}

export const initialApplicationsStatate : ApplicationsState = {applications: []};


