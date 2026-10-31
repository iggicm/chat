import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ToastrService {
  constructor(private snackBar: MatSnackBar) {}
  success(message: string, title = '', options: {timeOut?: number; [key: string]: unknown} = {}) {
    return this.show(message, title, options.timeOut, 'notification-success');
  }
  error(message: string, title = '', options: {timeOut?: number; [key: string]: unknown} = {}) {
    return this.show(message, title, options.timeOut, 'notification-error');
  }
  private show(message: string, title: string, duration = 5000, panelClass: string) {
    return this.snackBar.open([title, message].filter(Boolean).join(': '), 'Fermer', {duration, panelClass: [panelClass]});
  }
}
