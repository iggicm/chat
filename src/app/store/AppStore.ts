import {Action, createStore, Reducer} from 'redux';
import {appReducer} from '../reducer/AppReducer';
import {AppState, initialAppState} from '../state/AppState';
import {ListenerCallBack} from '../event/listener/Callback';

export class AppStore<T>{
  private state: T;
  private listeners: ListenerCallBack[];

  constructor(private reducer:Reducer<T>, initialStat: T){
    this.state = initialStat;
    this.listeners = [];
  }

  getState():T{
    return this.state;
  }

  dispatch(action: Action){
    //console.log("in dispatch: "+ JSON.stringify(action));
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((l:ListenerCallBack) => {
      l();
    });
  }

  subscribe(listener : ListenerCallBack): ListenerCallBack{
    this.listeners.push(listener);
    return ()=>{
      this.listeners = this.listeners.filter((l)=>l!==listener);
    };
  }

  getListeners():ListenerCallBack[]{
    return this.listeners;
  }



}

export let appStore: AppStore<AppState>= /*createStore(appReducer, initialAppState);*/new AppStore(appReducer,initialAppState);

export let initialAppStore: AppStore<AppState> = Object.assign({}, appStore);

export function initializeStore() {
  appStore = Object.assign({}, appStore);
}
