import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  isConnected = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isConnected = !this.isConnected;
    this.change.emit(this.isConnected);
  }

  getIsConnected():boolean{
    return this.isConnected;
  }

}
