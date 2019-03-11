import {ApplicationsState, initialApplicationsStatate} from './applications/ApplicationsState';

export interface AppState {
  applications: ApplicationsState;

};

export const initialAppState: AppState = {
  applications: initialApplicationsStatate
};







