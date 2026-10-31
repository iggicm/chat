import {AppState} from '../state/AppState';
import {Action} from 'redux';
import {Reducer} from 'redux';
import {ADD_APPLICATIONS_RESPONSE, AddApplicationsResponseAction} from '../action/applications-response-action';
import {ApplicationsResponse} from '../domain/model/ApplicationsResponse';
import {ApplicationsState} from '../state/applications/ApplicationsState';


export const appReducer: Reducer<AppState> = (appstate:AppState, action: Action):AppState=>{

  switch (action.type) {
    case ADD_APPLICATIONS_RESPONSE: {
      let applicationsResponseAction:AddApplicationsResponseAction = <AddApplicationsResponseAction>action;
      let applicationsResponse: ApplicationsResponse = Object.assign(applicationsResponseAction.applicationsResponse);
      let applicationState: ApplicationsState = {applications:applicationsResponse.response}
      let newAppstate: AppState = {applications:applicationState};
      let retVal: AppState = Object.assign({}, appstate, newAppstate);
      return retVal;
    }
    default:{
      return Object.assign({}, appstate);
    }
  }
};
