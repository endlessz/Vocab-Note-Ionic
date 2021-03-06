import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

	constructor(public toastCtrl: ToastController){
	}

	showToast($message){
	  this.toastCtrl.create({
        message: $message,
        duration: 3000,
        position: 'bottom'
      }).present()
	}
}